import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import * as React from "react";
import { useState, useEffect } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, ChevronRight, Check, Circle, CreditCard, ChevronDown, Menu, MapPin, Phone, Mail, Globe, DollarSign, Clock, CheckCircle, ArrowRight, Shield, IdCard, GraduationCap, UserRound, Receipt, PiggyBank, Lightbulb, Smartphone, Bus, Search, Send, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useLocation, Link, Routes, Route } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { useJsApiLoader, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "@react-google-maps/api";
import { Helmet } from "react-helmet";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft transition-smooth",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary/20 bg-background text-primary hover:bg-primary hover:text-primary-foreground transition-smooth",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-hero text-primary-foreground hover:shadow-hero transform hover:scale-105 transition-spring font-semibold",
        accent: "bg-gradient-accent text-accent-foreground hover:opacity-90 transition-smooth",
        success: "bg-success text-success-foreground hover:bg-success/90 transition-smooth"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isPathActive = (href) => {
    try {
      const url = new URL(href, "http://localhost");
      return url.pathname === location.pathname;
    } catch {
      return href === location.pathname;
    }
  };
  const navigation = [
    { name: "About Hafilat", href: "/#about-hafilat" },
    {
      name: "Recharge",
      children: [
        { name: "Bus Card Recharge", href: "/bus-card-recharge" },
        { name: "Recharge Locations", href: "/locations-hafilat-recharge" },
        { name: "Check Balance Online", href: "/hafilat-balance-online" }
      ]
    },
    { name: "Routes & Schedules", href: "/abu-dhabi-bus-routes" },
    { name: "Blog", href: "/blog" }
  ];
  return /* @__PURE__ */ jsx("header", { className: "bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center space-x-2 hover:opacity-80 transition-smooth", children: [
        /* @__PURE__ */ jsx(CreditCard, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-primary", children: "Hafilat Guide" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center space-x-8", children: navigation.map((item) => {
        if ("children" in item) {
          const active = item.children.some((c) => isPathActive(c.href));
          return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: `inline-flex items-center gap-1 text-foreground hover:text-primary transition-smooth font-medium pb-1 ${active ? "underline decoration-2 underline-offset-8" : ""}`, children: [
              /* @__PURE__ */ jsx("span", { children: item.name }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-70" })
            ] }),
            /* @__PURE__ */ jsx(DropdownMenuContent, { align: "start", className: "rounded-xl border border-border/60 shadow-2xl backdrop-blur bg-background/95 min-w-[14rem] p-1", children: item.children.map((child) => {
              const childActive = isPathActive(child.href);
              return /* @__PURE__ */ jsx(
                DropdownMenuItem,
                {
                  className: `rounded-md px-2 py-2.5 hover:bg-accent/60 focus:bg-accent/60 ${childActive ? "bg-accent/60" : ""}`,
                  children: /* @__PURE__ */ jsx(Link, { to: child.href, className: "w-full block text-sm", children: child.name })
                },
                child.name
              );
            }) })
          ] }, item.name);
        }
        return /* @__PURE__ */ jsx(
          Link,
          {
            to: item.href,
            className: `text-foreground hover:text-primary transition-smooth font-medium pb-1 ${isPathActive(item.href) ? "underline decoration-2 underline-offset-8" : ""}`,
            children: item.name
          },
          item.name
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", children: "Check Balance" }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "lg:hidden p-2",
          onClick: () => setIsMenuOpen(!isMenuOpen),
          "aria-label": "Toggle menu",
          children: isMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6 text-foreground" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6 text-foreground" })
        }
      )
    ] }),
    isMenuOpen && /* @__PURE__ */ jsx("div", { className: "lg:hidden py-4 border-t border-border", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col space-y-4", children: [
      navigation.map((item) => {
        if ("children" in item) {
          return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: item.name }),
            /* @__PURE__ */ jsx("div", { className: "ml-4 flex flex-col space-y-2", children: item.children.map((child) => {
              const childActive = isPathActive(child.href);
              return /* @__PURE__ */ jsx(
                Link,
                {
                  to: child.href,
                  className: `text-foreground/90 hover:text-primary transition-smooth ${childActive ? "underline decoration-2 underline-offset-4" : ""}`,
                  onClick: () => setIsMenuOpen(false),
                  children: child.name
                },
                child.name
              );
            }) })
          ] }, item.name);
        }
        return /* @__PURE__ */ jsx(
          Link,
          {
            to: item.href,
            className: `text-foreground hover:text-primary transition-smooth font-medium ${isPathActive(item.href) ? "underline decoration-2 underline-offset-4" : ""}`,
            onClick: () => setIsMenuOpen(false),
            children: item.name
          },
          item.name
        );
      }),
      /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", className: "mt-4", children: "Check Balance" })
    ] }) })
  ] }) });
};
const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(CreditCard, { className: "h-8 w-8" }),
          /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "Hafilat Guide" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-primary-foreground/80 text-sm leading-relaxed", children: "Your complete guide to Abu Dhabi's public transportation system. Get all the information you need about the Hafilat Card." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: "Quick Links" }),
        /* @__PURE__ */ jsxs("nav", { className: "flex flex-col space-y-2", children: [
          /* @__PURE__ */ jsx(Link, { to: "/#about-hafilat", className: "text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm", children: "About Hafilat Card" }),
          /* @__PURE__ */ jsx(Link, { to: "/bus-card-recharge", className: "text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm", children: "How to Recharge" }),
          /* @__PURE__ */ jsx(Link, { to: "/abu-dhabi-bus-routes", className: "text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm", children: "Routes & Schedules" }),
          /* @__PURE__ */ jsx(Link, { to: "/locations-hafilat-recharge", className: "text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm", children: "Recharge Locations" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: "Resources" }),
        /* @__PURE__ */ jsxs("nav", { className: "flex flex-col space-y-2", children: [
          /* @__PURE__ */ jsx(Link, { to: "/blog", className: "text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm", children: "Blog & Guides" }),
          /* @__PURE__ */ jsx("a", { href: "#faq", className: "text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm", children: "FAQ" }),
          /* @__PURE__ */ jsx(Link, { to: "/contact", className: "text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm", children: "Contact Support" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: "Contact" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-primary-foreground/60" }),
            /* @__PURE__ */ jsx("span", { className: "text-primary-foreground/80", children: "Abu Dhabi, UAE" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-primary-foreground/60" }),
            /* @__PURE__ */ jsx("span", { className: "text-primary-foreground/80", children: "+971 800 4235" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-primary-foreground/60" }),
            /* @__PURE__ */ jsx("span", { className: "text-primary-foreground/80", children: "info@hafilatguide.com" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-primary-foreground/20 mt-8 pt-8 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-primary-foreground/60 text-sm", children: [
      "Â© ",
      currentYear,
      " Hafilat Guide. All rights reserved. Not affiliated with DoT Abu Dhabi."
    ] }) })
  ] }) });
};
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Table = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props })
);
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props })
);
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tfoot", { ref, className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props })
);
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", { ref, className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className), ...props })
);
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props })
);
TableCaption.displayName = "TableCaption";
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const heroBg = "/assets/hero-bg-CbQmI28j.jpg";
const Home = () => {
  const features = [
    {
      icon: CreditCard,
      title: "Smart Payment",
      description: "Contactless payment for all Abu Dhabi public transport"
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "Save money with discounted fares compared to cash payments"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Advanced security features protect your balance and data"
    },
    {
      icon: Smartphone,
      title: "Easy Management",
      description: "Check balance, recharge, and manage your card digitally"
    }
  ];
  const quickActions = [
    {
      title: "Check Balance",
      description: "View your current Hafilat Card balance",
      icon: CreditCard,
      href: "/#check-hafilat-balance",
      variant: "hero"
    },
    {
      title: "Find Recharge Locations",
      description: "Locate nearest recharge points",
      icon: MapPin,
      href: "/locations-hafilat-recharge",
      variant: "accent"
    },
    {
      title: "View Routes",
      description: "Browse bus routes and schedules",
      icon: Bus,
      href: "/routes",
      variant: "outline"
    }
  ];
  const benefits = [
    "No need to carry exact change",
    "Faster boarding and reduced waiting times",
    "Track your travel expenses easily",
    "Refillable and reusable card",
    "Works on all public transport in Abu Dhabi"
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative py-20 lg:py-32 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
          style: { backgroundImage: `url(${heroBg})` },
          children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/80" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-primary-foreground space-y-6", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-6xl font-bold leading-tight", children: [
            "Your Complete",
            /* @__PURE__ */ jsx("span", { className: "block text-accent", children: " Hafilat Card" }),
            "Guide"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed", children: "Everything you need to know about Abu Dhabi's smart transportation card. From buying to recharging, we've got you covered." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center sm:justify-start", children: [
            /* @__PURE__ */ jsx("a", { href: "#check-hafilat-balance", children: /* @__PURE__ */ jsx(Button, { size: "lg", variant: "hero", className: "w-full sm:w-auto text-lg px-8 py-6", children: "Check Balance" }) }),
            /* @__PURE__ */ jsx("a", { href: "https://hafilat.darb.ae/", target: "_blank", rel: "noopener nofollow", children: /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "outline", className: "w-full sm:w-auto text-lg px-8 py-6", children: [
              "Official Site",
              /* @__PURE__ */ jsx(Globe, { className: "ml-2 h-5 w-5" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-md rounded-2xl border border-border/50 shadow-xl hover:shadow-2xl overflow-hidden bg-primary-foreground transform hover:scale-105 transition-spring p-2 sm:p-3", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/hafilat-card.png",
            alt: "Hafilat card illustration",
            className: "w-full h-auto object-contain rounded-md",
            loading: "eager"
          }
        ) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-foreground mb-4", children: "Why Choose Hafilat Card?" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Discover the benefits of Abu Dhabi's smart transportation solution" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: features.map((feature, index) => /* @__PURE__ */ jsxs(Card, { className: "text-center border-0 shadow-card hover:shadow-hero transition-spring", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 p-3 bg-gradient-hero rounded-full w-fit", children: /* @__PURE__ */ jsx(feature.icon, { className: "h-8 w-8 text-primary-foreground" }) }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: feature.title })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(CardDescription, { className: "text-base leading-relaxed", children: feature.description }) })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-foreground mb-4", children: "How to Recharge Your Hafilat Card" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Keep your card topped up with multiple convenient recharge options available across Abu Dhabi" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg", children: "1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "Bus Stations & Metro Stations" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Use the self-service kiosks available at all major bus stations and metro stations. Accept cash and credit cards." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg", children: "2" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "ADCB ATMs" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Recharge at any Abu Dhabi Commercial Bank (ADCB) ATM across the emirate. Available 24/7 for your convenience." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg", children: "3" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "Retail Outlets" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Visit authorized retailers including supermarkets, pharmacies, and convenience stores throughout Abu Dhabi." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg", children: "4" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "Mobile App & Online" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Use the official Hafilat app or website to recharge your card online using your credit or debit card." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "shadow-card border-accent/20", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(CreditCard, { className: "h-6 w-6 text-accent" }),
              /* @__PURE__ */ jsx("span", { children: "Minimum Recharge" })
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-accent mb-2", children: "AED 10" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Minimum amount for each recharge transaction" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "shadow-card border-success/20", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "h-6 w-6 text-success" }),
              /* @__PURE__ */ jsx("span", { children: "Maximum Balance" })
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-success mb-2", children: "AED 500" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Maximum balance you can store on your card" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "shadow-card border-primary/20", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-primary" }),
              /* @__PURE__ */ jsx("span", { children: "Instant Top-up" })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Your card balance is updated immediately after successful recharge" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Link, { to: "/locations-hafilat-recharge", children: /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "hero", className: "text-lg px-8 py-6", children: [
        "Find Recharge Locations Near You",
        /* @__PURE__ */ jsx(MapPin, { className: "ml-2 h-5 w-5" })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-foreground mb-4", children: "Quick Actions" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground", children: "Everything you need at your fingertips" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: quickActions.map((action, index) => /* @__PURE__ */ jsxs(Card, { className: "group hover:shadow-card transition-spring cursor-pointer border-border/50", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 p-4 bg-muted rounded-full w-fit group-hover:bg-gradient-hero transition-spring", children: /* @__PURE__ */ jsx(action.icon, { className: "h-8 w-8 text-primary group-hover:text-primary-foreground transition-smooth" }) }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: action.title }),
          /* @__PURE__ */ jsx(CardDescription, { className: "text-base", children: action.description })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "text-center", children: /* @__PURE__ */ jsx(Link, { to: action.href, children: /* @__PURE__ */ jsx(Button, { variant: action.variant, className: "w-full", children: "Get Started" }) }) })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-card", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-foreground mb-6", children: "Travel Smart with Hafilat" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground mb-8 leading-relaxed", children: "Join thousands of commuters who have made their daily travel easier and more convenient with the Hafilat Card." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: benefits.map((benefit, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-success flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: benefit })
        ] }, index)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx("a", { href: "#about-hafilat", children: /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "hero", children: [
          "Learn More About Hafilat",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-success/10 rounded-lg", children: /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-success" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Save Time" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Faster boarding process" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-accent/10 rounded-lg", children: /* @__PURE__ */ jsx(Shield, { className: "h-6 w-6 text-accent" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Secure Payment" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Protected transactions" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsx(DollarSign, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Cost Savings" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Discounted fare rates" })
          ] })
        ] }) }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "about-hafilat", className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold text-foreground mb-4", children: "What is the Hafilat Card?" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed", children: "The Hafilat Card is Abu Dhabi's smart payment card for public transportation, making your daily commute faster, easier, and more convenient." })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "mb-20", children: /* @__PURE__ */ jsxs("div", { className: "shadow-card border-0 bg-gradient-card rounded-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center pb-8 pt-8 px-6", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 p-4 bg-gradient-hero rounded-full w-fit", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-12 w-12 text-primary-foreground" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl lg:text-3xl font-semibold", children: "Smart Transportation Solution" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-6 pb-8 space-y-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground text-center leading-relaxed", children: "The Hafilat Card is a contactless smart card that allows you to pay for all public transportation services in Abu Dhabi, including buses and future metro services. It's designed to make your travel experience seamless and efficient." }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3", children: /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Faster Travel" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Quick tap-and-go payment" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-success/10 rounded-full w-fit mx-auto mb-3", children: /* @__PURE__ */ jsx(DollarSign, { className: "h-6 w-6 text-success" }) }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Cost Effective" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Discounted fare rates" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-accent/10 rounded-full w-fit mx-auto mb-3", children: /* @__PURE__ */ jsx(Shield, { className: "h-6 w-6 text-accent" }) }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Secure" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Protected transactions" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Convenient" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Rechargeable and reusable" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "mb-20", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "shadow-card rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-2", children: "How to Buy a Hafilat Card" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "Follow these simple steps to get your card" }),
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/30 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-primary", children: "1" })
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mt-3", children: "Visit a Sales Point" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Go to any authorized Hafilat Card sales location including bus stations and retail outlets." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/30 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(IdCard, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-primary", children: "2" })
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mt-3", children: "Provide Documents" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Bring a valid Emirates ID or passport. Students need a student ID." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/30 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(DollarSign, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-primary", children: "3" })
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mt-3", children: "Pay the Fee" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Pay AED 5 for the card (refundable when returned in good condition)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/30 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-primary", children: "4" })
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mt-3", children: "Load Credit" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Add at least AED 10 to start using public transport immediately." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-3", children: [
            /* @__PURE__ */ jsx("a", { href: "#purchase-locations", className: "text-sm underline", children: "Where to Buy" }),
            /* @__PURE__ */ jsx(Link, { to: "/bus-card-recharge", className: "text-sm underline", children: "How to Recharge" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "shadow-card rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-2", children: "Card Types" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "Choose the option that fits you" }),
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Regular Hafilat Card" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "AED 5 (refundable)" }),
              /* @__PURE__ */ jsxs("ul", { className: "mt-2 text-sm text-muted-foreground list-disc pl-4", children: [
                /* @__PURE__ */ jsx("li", { children: "Rechargeable" }),
                /* @__PURE__ */ jsx("li", { children: "Transferable" }),
                /* @__PURE__ */ jsx("li", { children: "5-year validity" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Student Card" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "AED 5 (refundable)" }),
              /* @__PURE__ */ jsxs("ul", { className: "mt-2 text-sm text-muted-foreground list-disc pl-4", children: [
                /* @__PURE__ */ jsx("li", { children: "50% discount" }),
                /* @__PURE__ */ jsx("li", { children: "Valid student ID required" }),
                /* @__PURE__ */ jsx("li", { children: "Academic year validity" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(UserRound, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Senior Citizen Card" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "AED 5 (refundable)" }),
              /* @__PURE__ */ jsxs("ul", { className: "mt-2 text-sm text-muted-foreground list-disc pl-4", children: [
                /* @__PURE__ */ jsx("li", { children: "Discounted fares" }),
                /* @__PURE__ */ jsx("li", { children: "Age verification required" }),
                /* @__PURE__ */ jsx("li", { children: "5-year validity" })
              ] })
            ] })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "purchase-locations", className: "mb-20", children: /* @__PURE__ */ jsx("div", { className: "shadow-card rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: "Where to Buy" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-base leading-relaxed text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: "Customer Happiness Offices:" }),
              " Purchase personalized cards at these offices located at bus stations and the airport."
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: "Authorized Retailers:" }),
              " Buy anonymous cards at authorized retailers such as Lulu Hypermarket, Lulu Exchange, and SPAR/Al Ain Cooperative Society."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(Link, { to: "/locations-hafilat-recharge", className: "underline text-sm", children: "See recharge locations" }),
            /* @__PURE__ */ jsx(Link, { to: "/bus-card-recharge", className: "underline text-sm", children: "How to recharge" })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "mb-4", children: /* @__PURE__ */ jsxs("div", { className: "shadow-card bg-muted rounded-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold mb-2", children: "Key Benefits" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "Why millions choose Hafilat Card for their daily commute" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-6 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-success flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "No Exact Change Required" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Never worry about having the right amount of cash again." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-success flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "Faster Boarding" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Quick tap-and-go system reduces boarding time." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-success flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "Discounted Fares" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Save money compared to cash payments." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-success flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "Track Your Spending" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Monitor your travel expenses easily." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-success flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "Reusable & Eco-Friendly" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Rechargeable card reduces paper waste." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-success flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "Wide Acceptance" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Works on all public transport in Abu Dhabi." })
              ] })
            ] })
          ] })
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "check-hafilat-balance", className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center mb-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold", children: "How to Check Your Hafilat Card Balance" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "Keeping an eye on your Hafilat card balance helps you avoid surprises at the gate and plan top-ups ahead of time." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border/40 bg-muted/20 p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Avoid gate surprises" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border/40 bg-muted/20 p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Plan top-ups ahead" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border/40 bg-muted/20 p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Receipt, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Track spending" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border/40 bg-muted/20 p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(PiggyBank, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Be ready for emergencies" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "shadow-card rounded-xl border border-border/50 bg-background/70 p-5 md:p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-1", children: "Step-by-Step: Online Balance Check" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mb-3", children: "It takes less than a minute:" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6 md:space-y-7", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold", children: "1" }),
              /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold", children: "Visit the Official Hafilat Website" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-muted-foreground", children: [
              "Go to the official portal: ",
              /* @__PURE__ */ jsx("a", { href: "https://hafilat.darb.ae/", target: "_blank", rel: "noopener nofollow", className: "underline", children: "https://hafilat.darb.ae/" }),
              ". This is the verified site where you can check your balance and recharge."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 rounded-lg overflow-hidden border border-border/60 bg-muted/20 p-2 shadow-sm max-w-3xl mx-auto", children: /* @__PURE__ */ jsx("img", { src: "/hafilat-balance-check.png", alt: "Hafilat website homepage screenshot", className: "w-full aspect-video object-cover rounded-md", loading: "lazy" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold", children: "2" }),
              /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold", children: 'Click on "Recharge Card"' })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-muted-foreground", children: [
              "On the homepage, select ",
              /* @__PURE__ */ jsx("em", { children: '"Recharge Card."' }),
              " New users may need to create an account; existing users can continue without logging in."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold", children: "3" }),
              /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold", children: "Enter Your Card Details" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-muted-foreground", children: [
              "On the balance check page, enter your ",
              /* @__PURE__ */ jsx("strong", { children: "Hafilat card serial number" }),
              " (found on the back of your card)."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 rounded-lg overflow-hidden border border-border/60 bg-muted/20 p-2 shadow-sm max-w-3xl mx-auto", children: /* @__PURE__ */ jsx("img", { src: "/hafilat-balance-check2.png", alt: "Hafilat enter card number field screenshot", className: "w-full aspect-video object-cover rounded-md", loading: "lazy" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold", children: "4" }),
              /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold", children: "Verify and Submit" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-muted-foreground", children: [
              "Click ",
              /* @__PURE__ */ jsx("em", { children: '"OK"' }),
              " or ",
              /* @__PURE__ */ jsx("em", { children: '"Submit"' }),
              " to process your request. The system will display your balance within seconds."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold", children: "5" }),
              /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold", children: "View Your Balance" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: "Your available balance will appear instantly. If it's low, you can recharge your card from the same page." }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 rounded-lg overflow-hidden border border-border/60 bg-muted/20 p-2 shadow-sm max-w-3xl mx-auto", children: /* @__PURE__ */ jsx("img", { src: "/hafilat-balance-check3.png", alt: "Hafilat balance result screenshot", className: "w-full aspect-video object-cover rounded-md", loading: "lazy" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto mt-10", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3 text-center", children: "Quick Recap" }),
        /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-border/50 overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Step" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Action" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Result" })
          ] }) }),
          /* @__PURE__ */ jsxs(TableBody, { children: [
            /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: "1" }),
              /* @__PURE__ */ jsxs(TableCell, { children: [
                "Go to ",
                /* @__PURE__ */ jsx("a", { href: "https://hafilat.darb.ae/", target: "_blank", rel: "noopener nofollow", className: "underline", children: "hafilat.darb.ae" })
              ] }),
              /* @__PURE__ */ jsx(TableCell, { children: "Access the official website" })
            ] }),
            /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: "2" }),
              /* @__PURE__ */ jsx(TableCell, { children: 'Click "Recharge Card"' }),
              /* @__PURE__ */ jsx(TableCell, { children: "Open balance check section" })
            ] }),
            /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: "3" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Enter card number" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Identify your card" })
            ] }),
            /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: "4" }),
              /* @__PURE__ */ jsx(TableCell, { children: 'Click "OK / Submit"' }),
              /* @__PURE__ */ jsx(TableCell, { children: "Process the inquiry" })
            ] }),
            /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: "5" }),
              /* @__PURE__ */ jsx(TableCell, { children: "View balance" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Recharge if needed" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "max-w-3xl mx-auto mt-10 border border-primary/30 bg-primary/5 rounded-2xl shadow-sm", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-2 h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsx(Lightbulb, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Final Tips for Travelers" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "pt-0", children: [
          /* @__PURE__ */ jsxs("ul", { className: "mx-auto max-w-prose list-disc pl-5 space-y-1 text-sm text-foreground/85 text-left", children: [
            /* @__PURE__ */ jsx("li", { children: "Always check your balance before your journey, especially during peak hours." }),
            /* @__PURE__ */ jsx("li", { children: "Bookmark the Hafilat website or save it on your phone for quick access." }),
            /* @__PURE__ */ jsx("li", { children: "Use the Darbi mobile app if you prefer checking on the go." }),
            /* @__PURE__ */ jsx("li", { children: "If your card doesn't load online, visit a bus station kiosk or customer service counter for help." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 text-center text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("strong", { children: "Official Website:" }),
            " ",
            /* @__PURE__ */ jsx("a", { href: "https://hafilat.darb.ae/", target: "_blank", rel: "noopener nofollow", className: "underline", children: "hafilat.darb.ae" }),
            " • ",
            /* @__PURE__ */ jsx("strong", { children: "Related:" }),
            " ",
            /* @__PURE__ */ jsx(Link, { to: "/locations-hafilat-recharge", className: "underline", children: "Where to Recharge Hafilat Card in Abu Dhabi" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "How can I check my Hafilat card balance online?", acceptedAnswer: { "@type": "Answer", text: "Visit hafilat.darb.ae, click on 'Recharge Card', enter your card number, and click 'Submit'. Your current balance will appear instantly on screen." } },
                { "@type": "Question", name: "Do I need an account to check my Hafilat balance?", acceptedAnswer: { "@type": "Answer", text: "No, you can check your balance directly without logging in. Simply click 'Recharge Card' and enter your card number." } },
                { "@type": "Question", name: "Can I recharge my Hafilat card from the same page?", acceptedAnswer: { "@type": "Answer", text: "Yes. Once your balance appears, you can select a recharge amount and complete the payment from the same page." } },
                { "@type": "Question", name: "What if the website doesn't show my balance?", acceptedAnswer: { "@type": "Answer", text: "If your card details don't load, check your number again or visit a nearby Hafilat kiosk or customer service counter for assistance." } },
                { "@type": "Question", name: "Can I use my Hafilat Card in Dubai?", acceptedAnswer: { "@type": "Answer", text: "No. Hafilat is valid only in Abu Dhabi. For Dubai, use the NOL Card. The systems are not integrated." } },
                { "@type": "Question", name: "What happens if my card balance is too low for a journey?", acceptedAnswer: { "@type": "Answer", text: "You cannot board with insufficient balance. There is no negative balance allowance. Keep at least 10 AED to avoid disruptions; traveling without enough balance may result in fines." } },
                { "@type": "Question", name: "Can multiple people use the same Hafilat Card?", acceptedAnswer: { "@type": "Answer", text: "No. Each traveler needs their own card. Sharing a card is not permitted and the system tracks individual journeys." } },
                { "@type": "Question", name: "What if I forget to tap my card when exiting the bus?", acceptedAnswer: { "@type": "Answer", text: "You may be charged the maximum fare for that route. This matters mainly for distance-based fares on intercity/suburban routes. Always tap in and out." } },
                { "@type": "Question", name: "Can I get a refund if I no longer need my Hafilat Card?", acceptedAnswer: { "@type": "Answer", text: "Yes. Request a refund at customer service centers. Bring the physical card and ID. Personalized cards are refunded more easily; anonymous card refunds are at the authority's discretion. Card fee (5–10 AED) is typically non-refundable." } },
                { "@type": "Question", name: "How do I transfer my balance if my card is damaged?", acceptedAnswer: { "@type": "Answer", text: "For personalized cards, visit a customer service center with ID to transfer the remaining balance to a new card (replacement fee applies). For anonymous cards, balances generally cannot be recovered." } },
                { "@type": "Question", name: "Are there any discounts for children?", acceptedAnswer: { "@type": "Answer", text: "Children under 5 travel free. Ages 5–10 can use a standard Hafilat Card (some routes may have discounts). Students under 18 should apply for the Student Hafilat Card for maximum discounts." } },
                { "@type": "Question", name: "Can tourists get temporary Hafilat Cards?", acceptedAnswer: { "@type": "Answer", text: "Yes. Temporary cards (valid 14–30 days) are available at the airport, major bus stations, and some hotels. Tourists can also buy an anonymous card (no expiry) for ~10 AED." } },
                { "@type": "Question", name: "What's the maximum amount I can load onto my Hafilat Card?", acceptedAnswer: { "@type": "Answer", text: "The maximum balance is 1,000 AED for all card types. Attempts to load more will be declined." } },
                { "@type": "Question", name: "How can I check the history of my card usage?", acceptedAnswer: { "@type": "Answer", text: "For personalized cards, register on the DARB portal or visit customer service for transaction history. For anonymous cards, only the current balance is available at TVMs or service centers." } }
              ]
            })
          }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-foreground mb-4", children: "Why Choose Hafilat Card?" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Discover the benefits of Abu Dhabi's smart transportation solution" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: features.map((feature, index) => /* @__PURE__ */ jsxs(Card, { className: "text-center border-0 shadow-card hover:shadow-hero transition-spring", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 p-3 bg-gradient-hero rounded-full w-fit", children: /* @__PURE__ */ jsx(feature.icon, { className: "h-8 w-8 text-primary-foreground" }) }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: feature.title })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(CardDescription, { className: "text-base leading-relaxed", children: feature.description }) })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-foreground mb-4", children: "How to Recharge Your Hafilat Card" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Keep your card topped up with multiple convenient recharge options available across Abu Dhabi" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg", children: "                  1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "Bus Stations & Metro Stations" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Use the self-service kiosks available at all major bus stations and metro stations. Accept cash and credit cards." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg", children: "2" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "ADCB ATMs" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Recharge at any Abu Dhabi Commercial Bank (ADCB) ATM across the emirate. Available 24/7 for your convenience." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg", children: "3" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "Retail Outlets" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Visit authorized retailers including supermarkets, pharmacies, and convenience stores throughout Abu Dhabi." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg", children: "4" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "Mobile App & Online" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Use the official Hafilat app or website to recharge your card online using your credit or debit card." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "shadow-card border-accent/20", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(CreditCard, { className: "h-6 w-6 text-accent" }),
              /* @__PURE__ */ jsx("span", { children: "Minimum Recharge" })
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-accent mb-2", children: "AED 10" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Minimum amount for each recharge transaction" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "shadow-card border-success/20", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "h-6 w-6 text-success" }),
              /* @__PURE__ */ jsx("span", { children: "Maximum Balance" })
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-success mb-2", children: "AED 500" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Maximum balance you can store on your card" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "shadow-card border-primary/20", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-primary" }),
              /* @__PURE__ */ jsx("span", { children: "Instant Top-up" })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Your card balance is updated immediately after successful recharge" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Link, { to: "/locations-hafilat-recharge", children: /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "hero", className: "text-lg px-8 py-6", children: [
        "Find Recharge Locations Near You",
        /* @__PURE__ */ jsx(MapPin, { className: "ml-2 h-5 w-5" })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-foreground mb-4", children: "Quick Actions" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground", children: "Everything you need at your fingertips" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: quickActions.map((action, index) => /* @__PURE__ */ jsxs(Card, { className: "group hover:shadow-card transition-spring cursor-pointer border-border/50", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 p-4 bg-muted rounded-full w-fit group-hover:bg-gradient-hero transition-spring", children: /* @__PURE__ */ jsx(action.icon, { className: "h-8 w-8 text-primary group-hover:text-primary-foreground transition-smooth" }) }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: action.title }),
          /* @__PURE__ */ jsx(CardDescription, { className: "text-base", children: action.description })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "text-center", children: /* @__PURE__ */ jsx(Link, { to: action.href, children: /* @__PURE__ */ jsx(Button, { variant: action.variant, className: "w-full", children: "Get Started" }) }) })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-card", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-foreground mb-6", children: "Travel Smart with Hafilat" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground mb-8 leading-relaxed", children: "Join thousands of commuters who have made their daily travel easier and more convenient with the Hafilat Card." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: benefits.map((benefit, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-success flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: benefit })
        ] }, index)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx("a", { href: "#about-hafilat", children: /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "hero", children: [
          "Learn More About Hafilat",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-success/10 rounded-lg", children: /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-success" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Save Time" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Faster boarding process" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-accent/10 rounded-lg", children: /* @__PURE__ */ jsx(Shield, { className: "h-6 w-6 text-accent" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Secure Payment" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Protected transactions" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsx(DollarSign, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Cost Savings" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Discounted fare rates" })
          ] })
        ] }) }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-hero", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-primary-foreground mb-4", children: "Ready to Get Your Hafilat Card?" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto", children: "Start your journey with Abu Dhabi's smart transportation system today" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx("a", { href: "#about-hafilat", children: /* @__PURE__ */ jsx(Button, { size: "lg", variant: "accent", className: "text-lg px-8 py-6", children: "How to Buy" }) }),
        /* @__PURE__ */ jsx(Link, { to: "/locations-hafilat-recharge", children: /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary", children: "How to Recharge" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "faqs", className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl lg:text-3xl font-bold", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Find answers to the most common questions about Hafilat." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs(Accordion, { type: "single", collapsible: true, className: "w-full", children: [
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q1", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "Can I use my Hafilat Card in Dubai?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "No. Hafilat works only in Abu Dhabi. For Dubai, use the NOL Card." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q2", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "What happens if my balance is too low?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "You cannot board with insufficient balance. Keep at least 10 AED to avoid disruptions; traveling without enough balance may result in fines." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q3", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "Can multiple people use the same card?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "No. Each traveler must use their own card." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q4", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "What if I forget to tap out?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "You may be charged the maximum route fare, especially on distance‑based routes. Always tap when boarding and alighting." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q5", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "Can I get a refund if I no longer need my card?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "Yes. Request at customer service centers with your card and ID. Card fee (5–10 AED) is typically non‑refundable." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q6", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "How do I transfer balance if my card is damaged?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "Personalized cards: transfer at customer service (replacement fee applies). Anonymous cards: balances generally cannot be recovered." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q7", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "Are there discounts for children?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "Under 5 ride free. Ages 5–10 can use a standard card; students under 18 should apply for the Student Hafilat Card." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q8", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "Can tourists get temporary cards?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "Yes. Temporary cards (14–30 days) are available at the airport and major stations; tourists may also buy an anonymous card (~10 AED)." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q9", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "What’s the maximum balance?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "1,000 AED for all card types." })
        ] }),
        /* @__PURE__ */ jsxs(AccordionItem, { value: "q10", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: "How can I check my usage history?" }),
          /* @__PURE__ */ jsx(AccordionContent, { children: "Personalized cards: DARB portal or customer service. Anonymous cards: only current balance at TVMs or service centers." })
        ] })
      ] }) })
    ] }) })
  ] });
};
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(ScrollAreaPrimitive.Root, { ref, className: cn("relative overflow-hidden", className), ...props, children: [
  /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
  /* @__PURE__ */ jsx(ScrollBar, {}),
  /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
] }));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const GOOGLE_MAPS_LIBRARIES = ["places"];
const busRoutes = [
  // Regional Bus to Abu Dhabi City
  { number: "101", name: "Reg Bus 101", route: "Al Danah, Sultan Bin Zayed St / Capital Park; Abu Dhabi Industrial City, Al Wazn St / Dalma Mall Main Entrance", type: "regional" },
  { number: "102", name: "Reg Bus 102", route: "Al Danah, Sultan Bin Zayed St / Capital Park; MBZ City, MBZ City Bus Station", type: "regional" },
  { number: "103", name: "Reg Bus 103", route: "Al Danah, Sultan Bin Zayed St / Capital Park; MBZ City, Al Nasr Street / Abu Dhabi Vocational Education and Training Institute (ADVETI)", type: "regional" },
  { number: "110", name: "Reg Bus 110", route: "Al Danah, Sultan Bin Zayed Street / Khalifa Bin Zayed Street; Mussafah, Street 16 / National Petroleum Corporation", type: "regional" },
  { number: "111", name: "Reg Bus 111", route: "Al Danah, Sultan Bin Zayed Street / Khalifa Bin Zayed Street; Mussafah, Street 14 / Tasheel", type: "regional" },
  { number: "120", name: "Reg Bus 120", route: "Al Saadiyat, Shati Al Saadiyat Street / Saadiyat Public Beach; MBZ City, Street 79 / Mazyad Mall", type: "regional" },
  { number: "121", name: "Reg Bus 121", route: "Al Saadiyat, Al Dhiba Street / Hidd Al Saadiyat; MBZ, Street 79 / Mazyad Mall", type: "regional" },
  { number: "155", name: "Reg Bus 155", route: "Al Danah, Sultan Bin Zayed Street / Khalifa Bin Zayed Street; Shakhbout City, ADNOC", type: "regional" },
  { number: "160", name: "Reg Bus 160", route: "Al Danah, Sultan Bin Zayed Street / Khalifa Bin Zayed Street; Khalifa City, Theyab Bin Eissa Street / Souq", type: "regional" },
  { number: "161", name: "Reg Bus 161", route: "Al Bateen, Corniche Street / Commercial International Bank; Khalifa City, Theyab Bin Eissa Street / Souq", type: "regional" },
  { number: "170", name: "Reg Bus 170", route: "Al Saadiyat, Saadiyat New York University 2; Al Rahah, Al Zeina", type: "regional" },
  { number: "175", name: "Reg Bus 175", route: "Al Bateen, Al Bateen Street / Children's Garden; Al Rahah, Al Zeina", type: "regional" },
  { number: "201", name: "Reg Bus 201", route: "Al Bahyah, Al Sa'ay St / Shuhadah Badar Mosque; Al Nahyan, Abu Dhabi Bus Station", type: "regional" },
  { number: "202", name: "Reg Bus 202", route: "Al Rahbah, Al Yaseer St / Al Rahba Hospital; Al Nahyan, Abu Dhabi Bus Station", type: "regional" },
  { number: "300", name: "Reg Bus 300", route: "Al Shamkha, Al Shamkha Makani Mall; Al Danah, Sultan Bin Zayed St / Capital Park", type: "regional" },
  { number: "350", name: "Reg Bus 350", route: "Sweihan Slaughter House; Central District, Othman Bin Affan St / Al Ain Central Bus Station", type: "regional" },
  { number: "360", name: "Reg Bus 360", route: "81th St / Ali Hader Al Mazrouei Mosque; Central District, Othman Bin Affan St / Al Ain Central Bus Station", type: "regional" },
  { number: "380", name: "Reg Bus 380", route: "Service Rd / Al Rahman Mosque; Central District, Othman Bin Affan St / Al Ain Central Bus Station", type: "regional" },
  { number: "390", name: "Reg Bus 390", route: "Service Rd / Souq; Central District, Othman Bin Affan St / Al Ain Central Bus Station", type: "regional" },
  { number: "401", name: "Reg Bus 401", route: "Al Danah, Sultan Bin Zayed St / Capital Park; Bani Yas, Bani Yas St / Souq", type: "regional" },
  { number: "404", name: "Reg Bus 404", route: "Al Danah, Sultan Bin Zayed St / Capital Park; Al Nahdah, Al Burouj St /Municipality office", type: "regional" },
  { number: "405", name: "Reg Bus 405", route: "Al Danah, Sultan Bin Zayed St / Capital Park; Al Nahdah, Al Burouj St /Municipality office", type: "regional" },
  { number: "407", name: "Reg Bus 407", route: "Al Zahiyah, Ghurair Al Ojaan Mosque; Al Mafraq Workers City, Al Raha Shopping Centre", type: "regional" },
  // Regional Bus between Suburbs
  { number: "210", name: "Midi Bus 210", route: "Al Bahyah, Al Sinad St / Al Shahama Bus Station; Abu Dhabi Industrial City, Al Wazn St / Dalma Mall Main Entrance", type: "midi" },
  { number: "216", name: "Midi Bus 216", route: "Al Bahyah, Al Sinad St / Al Shahama Bus Station; MBZ City, MBZ City Bus Station", type: "midi" },
  { number: "410", name: "Midi Bus 410", route: "Mussafah, Street 7 / Mussafah Port; Al Mafraq Workers City, LifeCare Hospital", type: "midi" },
  { number: "420", name: "Midi Bus 420", route: "Shakhbout City, ADNOC; Al Mafraq Workers City, LifeCare Hospital", type: "midi" },
  // Airport Bus
  { number: "A1", name: "Reg Bus A1", route: "Al Zahiyah, Ghurair Al Ojaan Mosque; Abu Dhabi International Airport, Terminal 2", type: "airport" },
  { number: "A2", name: "Reg Bus A2", route: "Al Danah, Khalifa Bin Zayed St / Shk. Zayed Bin Sultan St; Abu Dhabi International Airport, Terminal 2", type: "airport" },
  { number: "A10", name: "Reg Bus A10", route: "MBZ City, MBZ City Bus Station; MBZ City, MBZ City Bus Station", type: "airport" },
  { number: "A40", name: "Reg Bus A40", route: "Al Bahyah, Al Sinad St / Al Shahama Bus Station; Baniyas West, Baniyas West Bus Station", type: "airport" },
  // City Bus Network - Express
  { number: "X4", name: "City Bus X4", route: "Al Zahiyah, Al Meena St / Corniche Hospital 2; Rabdan, Khaleej Al Arabi St / Bus Interchange", type: "express" },
  { number: "X5", name: "City Bus X5", route: "Al Zahiyah, Al Meena St / Corniche Hospital 2; Rabdan, Khaleej Al Arabi St / Bus Interchange", type: "express" },
  { number: "X60", name: "Exp Bus X60", route: "Al Nahyan, Abu Dhabi Bus Station; Liwa Mezaira'a Bus Station", type: "express" },
  { number: "X88", name: "Exp Bus X88", route: "Al Nahyan, Abu Dhabi Bus Station; Ruwais ADNOC Bus Station", type: "express" },
  { number: "X90", name: "Exp Bus X90", route: "Service Road / Al Ain Central Bus Station; Al Nahyan, Abu Dhabi Bus Station", type: "express" },
  // City Bus - Local
  { number: "5", name: "City Bus 5", route: "Al Zahiyah, Al Falah St / Shk. Zayed Bin Sultan St; Al Kasir, King Salman Bin Abdulaziz Al Saud St / Marina Mall", type: "city" },
  { number: "7", name: "City Bus 7", route: "Al Zahiyah, Al Falah Street / Sheikh Zayed Bin Sultan Street; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall", type: "city" },
  { number: "8", name: "City Bus 8", route: "Zayed Port, Al Doum St / Fish Market; Al Bateen, Al Quffal St / Marina Al Bateen", type: "city" },
  { number: "9", name: "City Bus 9", route: "Zayed Port, Cruise Terminal; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall", type: "city" },
  { number: "11", name: "City Bus 11", route: "Zayed Port, Al Suhiliyah Street / Al Mina Centre; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall", type: "city" },
  { number: "21", name: "City Bus 21", route: "Rabdan, Al Maqta Street / Quran Memorisation Centre; Al Bateen, Al Bateen Street / Children's Garden", type: "city" },
  { number: "22", name: "City Bus 22", route: "Rabdan, Al Khor Street / Qaryat Al Beri Souq; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall", type: "city" },
  { number: "23", name: "City Bus 23", route: "Bawabat Abu Dhabi, Bawabat Abu Dhabi Street / Coop; Al Bateen, Al Bateen Street / Children's Garden", type: "city" },
  { number: "26", name: "City Bus 26", route: "Al Muntazeh, Al Muntazeh Street / Khalifa Park; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall", type: "city" },
  { number: "33", name: "City Bus 33", route: "Al Rawdah, Al Mu-atamarat Street / ADNEC; Al Bateen, Al Bateen Street / Children's Garden", type: "city" },
  { number: "34", name: "City Bus 34", route: "Al Rawdah, Al Nawfal Street / Abu Dhabi Courts; Al Ras Al Akhdar, Qasar Al Watan", type: "city" },
  { number: "40", name: "City Bus 40", route: "Al Muntazeh, Al Sunbulah Street / Al Muntazeh South; Jazeerat Al Maryah, Hamouda Bin Ali Al Dhaheri Street / Al Maryah", type: "city" },
  { number: "41", name: "City Bus 41", route: "Al Rawdah, Al Mu-atamarat Street / Al Zahiyah, Al Meena Street / Corniche Hospital 1", type: "city" },
  { number: "42", name: "City Bus 42", route: "Al Rawdah, Al Nawfal Street / Abu Dhabi Courts; Jazeerat Al Maryah, Hamouda Bin Ali Al Dhaheri Street / Al Maryah", type: "city" },
  { number: "43", name: "City Bus 43", route: "Al Mushrif, Al Markib Street / Al Mushrif Coop; Al Zahiyah, Al Meena Street / Corniche Hospital 2", type: "city" },
  { number: "44", name: "City Bus 44", route: "Al Muzoun, Al Nada Street / Abu Dhabi Ladies Club; Zayed Port, Cruise Terminal", type: "city" },
  { number: "45", name: "City Bus 45", route: "Al Nahyan, Abu Dhabi Bus Station / Al Nahyan, Abu Dhabi Bus Station", type: "city" },
  { number: "54", name: "City Bus 54", route: "Al Rawdah, Saif Ghobash Street / Sheikh Zayed Grand Mosque; Zayed Port, Al Doum Street / Fish Market", type: "city" },
  { number: "55", name: "City Bus 55", route: "Al Muntazeh, Al Sunbulah Street / Al Muntazeh South; Al Zahiyah, Al Meena Street / Corniche Hospital 1", type: "city" },
  { number: "56", name: "City Bus 56", route: "Al Muntazah, Al Muntazah St / Khalifa Park; Zayed Port, Al Luluah St / Al Qibli St", type: "city" },
  { number: "63", name: "City Bus 63", route: "Al Reem Island, Al Reem Mall; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall", type: "city" },
  { number: "65", name: "City Bus 65", route: "Jazeerat Al Reem, Al Rayfah Street / Al Reem City of Lights; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall", type: "city" },
  { number: "67", name: "City Bus 67", route: "Jazeerat Al Reem, Al Muqarrab Street / Al Reem Shams; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall", type: "city" },
  { number: "69", name: "City Bus 69", route: "Jazeerat Al Maryah, Hamouda Bin Ali Al Dhaheri Street / Al Maryah; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall", type: "city" },
  { number: "71", name: "City Bus 71", route: "Jazeerat Al Reem, Al Muqarrab Street / Al Reem Shams; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall", type: "city" },
  { number: "73", name: "City Bus 73", route: "Jazeerat Al Reem, Al 'Oud St / Al Reem Shams; Al Hudayriat, Bab Al Nojoum", type: "city" },
  { number: "94", name: "City Bus 94", route: "Al Rawdah, Al Majd Street / Wahat Al Karamah; Al Saadiyat, Jacques Chirac Street / Mamsha Al Saadiyat", type: "city" }
];
const mapContainerStyle = {
  width: "100%",
  height: "100%"
};
const defaultCenter = {
  lat: 24.47,
  lng: 54.37
};
const AbuDhabiBusRoutes = () => {
  const [selectedRoute, setSelectedRoute] = useState(busRoutes[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [directions, setDirections] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [map, setMap] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(null);
  const [infoOpen, setInfoOpen] = useState(true);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAC_PLPccllsgsOhFnc6kra56TekxOqhWA",
    libraries: GOOGLE_MAPS_LIBRARIES,
    language: "en"
  });
  useEffect(() => {
    if (isLoaded && selectedRoute && window.google) {
      setIsLoading(true);
      setError(null);
      const [origin, destination] = selectedRoute.route.split(";").map((s) => s.trim());
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: `${origin}, Abu Dhabi, UAE`,
          destination: `${destination}, Abu Dhabi, UAE`,
          travelMode: google.maps.TravelMode.TRANSIT
        },
        (result, status) => {
          var _a, _b;
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            if (result.routes[0] && result.routes[0].legs[0]) {
              setRouteInfo({
                duration: ((_a = result.routes[0].legs[0].duration) == null ? void 0 : _a.text) || "N/A",
                distance: ((_b = result.routes[0].legs[0].distance) == null ? void 0 : _b.text) || "N/A"
              });
            } else {
              setRouteInfo(null);
            }
            searchBusStopsAlongRoute(result);
          } else {
            console.error("Directions request failed:", status);
            setDirections(null);
            setBusStops([]);
            setRouteInfo(null);
            setError(`Failed to load directions: ${status}`);
          }
          setIsLoading(false);
        }
      );
    } else if (isLoaded && !selectedRoute) {
      setDirections(null);
      setBusStops([]);
      setRouteInfo(null);
      setIsLoading(false);
      setError(null);
    }
  }, [isLoaded, selectedRoute]);
  const searchBusStopsAlongRoute = (directionsResult) => {
    if (!map || !window.google) return;
    const route = directionsResult.routes[0];
    if (!route || !route.legs[0]) return;
    const path = route.overview_path;
    const allStops = [];
    const processedPlaceIds = /* @__PURE__ */ new Set();
    const searchPoints = [
      path[0],
      // Start
      path[Math.floor(path.length * 0.25)],
      // 25%
      path[Math.floor(path.length * 0.5)],
      // 50%
      path[Math.floor(path.length * 0.75)],
      // 75%
      path[path.length - 1]
      // End
    ];
    const service = new google.maps.places.PlacesService(map);
    let completedSearches = 0;
    searchPoints.forEach((point) => {
      const request = {
        location: point,
        radius: 1500,
        // 1.5km radius
        type: "bus_station"
      };
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            var _a;
            if (place.place_id && ((_a = place.geometry) == null ? void 0 : _a.location) && !processedPlaceIds.has(place.place_id)) {
              processedPlaceIds.add(place.place_id);
              allStops.push({
                position: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                },
                name: place.name || "Bus Stop",
                placeId: place.place_id
              });
            }
          });
        }
        completedSearches++;
        if (completedSearches === searchPoints.length) {
          setBusStops(allStops);
        }
      });
    });
  };
  const filteredRoutes = busRoutes.filter(
    (route) => route.number.toLowerCase().includes(searchTerm.toLowerCase()) || route.name.toLowerCase().includes(searchTerm.toLowerCase()) || route.route.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getRouteTypeColor = (type) => {
    switch (type) {
      case "regional":
        return "bg-primary/10 text-primary border-primary/20";
      case "midi":
        return "bg-accent/10 text-accent border-accent/20";
      case "airport":
        return "bg-success/10 text-success border-success/20";
      case "express":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "city":
        return "bg-secondary/10 text-secondary border-secondary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  const getStrokeColor = (type) => {
    switch (type) {
      case "regional":
        return "#2563eb";
      case "midi":
        return "#f59e0b";
      case "airport":
        return "#10b981";
      case "express":
        return "#ef4444";
      case "city":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Abu Dhabi Bus Routes & Schedule - Track Buses Online" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Tracking online Abu Dhabi bus routes in our interactive map. Find your bus route without errors" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-primary via-primary-glow to-accent py-6 md:py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3", children: "Abu Dhabi Bus Routes & Schedule" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/90 text-sm md:text-base max-w-2xl", children: "Explore all Abu Dhabi bus routes and plan your journey with interactive maps" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 container mx-auto px-4 py-4 md:py-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-3 md:gap-4 h-auto lg:h-[calc(100vh-220px)]", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-3 md:p-4 flex flex-col h-[50vh] lg:h-full lg:w-80 xl:w-96 flex-shrink-0", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Search routes...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "pl-9 h-9 text-sm"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(ScrollArea, { className: "flex-1 -mx-3 md:-mx-4 px-3 md:px-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-1.5 md:space-y-2", children: filteredRoutes.map((route) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedRoute(route),
              className: `w-full text-left p-2.5 md:p-3 rounded-lg border transition-all hover:shadow-md ${(selectedRoute == null ? void 0 : selectedRoute.number) === route.number ? "bg-primary/5 border-primary shadow-sm" : "bg-card border-border hover:border-primary/50"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 md:gap-2.5", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Bus, { className: "h-4 w-4 md:h-5 md:w-5 text-primary" }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                    /* @__PURE__ */ jsx(Badge, { variant: "outline", className: `${getRouteTypeColor(route.type)} text-xs px-1.5 py-0`, children: route.number }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground capitalize", children: route.type })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-muted-foreground line-clamp-2", children: route.route })
                ] })
              ] })
            },
            route.number
          )) }) })
        ] }),
        /* @__PURE__ */ jsx(Card, { className: "p-0 overflow-hidden h-[50vh] lg:h-full lg:flex-1", children: isLoaded ? /* @__PURE__ */ jsxs(
          GoogleMap,
          {
            mapContainerStyle,
            center: defaultCenter,
            zoom: 10,
            onLoad: (mapInstance) => setMap(mapInstance),
            options: {
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true
            },
            children: [
              directions && /* @__PURE__ */ jsx(
                DirectionsRenderer,
                {
                  directions,
                  options: {
                    suppressMarkers: false,
                    polylineOptions: {
                      strokeColor: selectedRoute ? getStrokeColor(selectedRoute.type) : "#2563eb",
                      strokeWeight: 5,
                      strokeOpacity: 0.8
                    }
                  }
                }
              ),
              busStops.map((stop) => /* @__PURE__ */ jsx(
                Marker,
                {
                  position: stop.position,
                  title: stop.name,
                  onClick: () => setInfoWindowOpen(stop.placeId),
                  icon: {
                    path: "M12 2c-4.418 0-8 3.582-8 8 0 4.418 8 14 8 14s8-9.582 8-14c0-4.418-3.582-8-8-8zm0 12c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z",
                    // Custom pin-like path
                    fillColor: selectedRoute ? getStrokeColor(selectedRoute.type) : "#6b7280",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2,
                    scale: 1,
                    anchor: new google.maps.Point(12, 24)
                    // Adjust anchor to center the tip of the pin
                  },
                  children: infoWindowOpen === stop.placeId && /* @__PURE__ */ jsx(
                    InfoWindow,
                    {
                      onCloseClick: () => setInfoWindowOpen(null),
                      position: stop.position,
                      children: /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: stop.name }),
                        /* @__PURE__ */ jsx("p", { children: "Bus Stop" })
                      ] })
                    }
                  )
                },
                stop.placeId
              ))
            ]
          }
        ) : isLoading ? /* @__PURE__ */ jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Loading route and stops..." }) }) : error ? /* @__PURE__ */ jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-destructive font-semibold text-center p-4", children: error }) }) : /* @__PURE__ */ jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Select a bus route to see details on the map" }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "mt-4 p-3 md:p-4 bg-primary/5 border border-primary/20 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base font-medium text-foreground", children: "Service information" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setInfoOpen((v) => !v),
              className: "inline-flex items-center gap-1 text-xs md:text-sm text-primary hover:bg-primary/10 px-2 py-1 rounded",
              "aria-expanded": infoOpen,
              "aria-controls": "service-info-content",
              children: [
                infoOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }),
                infoOpen ? "Hide" : "Show",
                " details"
              ]
            }
          )
        ] }),
        infoOpen && /* @__PURE__ */ jsxs("div", { id: "service-info-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-2 text-xs md:text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Bus, { className: "h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Total Routes: ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: filteredRoutes.length })
              ] })
            ] }),
            routeInfo && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Duration: ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: routeInfo.duration })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Distance: ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: routeInfo.distance })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs md:text-sm font-medium text-foreground", children: "Service schedule overview" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 overflow-x-auto -mx-1 max-h-44 md:max-h-60 overflow-y-auto border border-border rounded", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full table-fixed text-[11px] md:text-xs", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "px-2 py-1 text-left font-medium", children: "Route / Line" }),
              /* @__PURE__ */ jsx("th", { className: "px-2 py-1 text-left font-medium whitespace-nowrap", children: "First Bus" }),
              /* @__PURE__ */ jsx("th", { className: "px-2 py-1 text-left font-medium whitespace-nowrap", children: "Last Bus" }),
              /* @__PURE__ */ jsx("th", { className: "px-2 py-1 text-left font-medium whitespace-nowrap", children: "Frequency (min)" }),
              /* @__PURE__ */ jsx("th", { className: "px-2 py-1 text-left font-medium whitespace-nowrap", children: "Service Days" }),
              /* @__PURE__ */ jsx("th", { className: "px-2 py-1 text-left font-medium", children: "Estimated Schedule (detail)" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-border", children: [
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "City Routes (e.g., 5, 7, 8, ...)" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "06:00" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "23:00" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "15-30" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "All (Sun-Sat)" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "Buses every 15-30 minutes, running between terminals and neighborhoods from around 06:00 to 23:00." })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "Intercity (e.g., E100, E101, ...)" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "05:30" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "23:30" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "30-60" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "All" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "Long-distance services between central stations and towns every 30-60 minutes. E100: from Abu Dhabi Central, departures every 30-60 min; last bus to Al Ghubaiba (Dubai) around 23:10." })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "Express (X5, X60, ...)" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "07:00" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "22:00" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "30-45" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "All" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "Fast direct services with fewer stops and shorter travel times." })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "Tourist and Special Buses" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "09:30" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "17:00" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top whitespace-nowrap", children: "60-90" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "Daily" }),
                /* @__PURE__ */ jsx("td", { className: "px-2 py-1 align-top", children: "Hop-on hop-off City Tour: 09:30-17:00, every ~90 min. Grand Mosque tour: special departures at 11:30 and 14:30." })
              ] })
            ] })
          ] }) })
        ] })
      ] })
    ] })
  ] });
};
const Index = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "Welcome to Your Blank App" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground", children: "Start building your amazing project here!" })
  ] }) });
};
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const Contact = () => {
  const { toast: toast2 } = useToast();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const subject = String(fd.get("subject") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message) {
      toast2({ title: "Please fill the required fields", description: "Name, email and message are required.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const to = "info@hafilatguide.com";
    const mailto = new URL(`mailto:${to}`);
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      subject ? `Subject: ${subject}` : void 0,
      "",
      message
    ].filter(Boolean);
    mailto.searchParams.set("subject", subject || `Contact from ${name}`);
    mailto.searchParams.set("body", bodyLines.join("\n"));
    setTimeout(() => {
      setLoading(false);
      toast2({ title: "Opening your mail app…", description: "If nothing happens, copy the details and email us." });
      window.location.href = mailto.toString();
      e.currentTarget.reset();
    }, 300);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contact Us — Hafilat Guide" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Contact Hafilat Guide. Send us your questions about Abu Dhabi Hafilat Card, recharges, locations and routes." })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs(Card, { className: "shadow-card", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Contact Us" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "We usually reply within 1–2 business days." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm mb-1", children: "Name" }),
              /* @__PURE__ */ jsx(Input, { id: "name", name: "name", placeholder: "Your full name", required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm mb-1", children: "Email" }),
              /* @__PURE__ */ jsx(Input, { id: "email", type: "email", name: "email", placeholder: "you@example.com", required: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "subject", className: "block text-sm mb-1", children: "Subject" }),
            /* @__PURE__ */ jsx(Input, { id: "subject", name: "subject", placeholder: "How can we help?" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-sm mb-1", children: "Message" }),
            /* @__PURE__ */ jsx(Textarea, { id: "message", name: "message", rows: 6, placeholder: "Write your message…", required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "By submitting, you agree to be contacted about your inquiry." }),
            /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading, children: [
              /* @__PURE__ */ jsx(Send, { className: "h-4 w-4 mr-2" }),
              loading ? "Sending…" : "Send Message"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "shadow-card", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Other ways to reach us" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Prefer email or phone? We’ve got you covered." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsx("a", { href: `mailto:${"info@hafilatguide.com"}`, className: "underline", children: "info@hafilatguide.com" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "+971 800 4235" })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-gray-600", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 underline hover:text-blue-700", children: "Return to Home" })
  ] }) });
};
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
    ...props
  }
));
Separator.displayName = SeparatorPrimitive.Root.displayName;
function AuthorCard({
  name,
  url,
  jobTitle,
  country,
  imageSrc,
  imageAlt = "Author photo",
  datePublished,
  dateModified,
  description
}) {
  const formatDate = (iso) => {
    if (!iso) return void 0;
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (_) {
      return iso;
    }
  };
  const humanPublished = formatDate(datePublished);
  const humanModified = formatDate(dateModified);
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: "w-full max-w-xl mx-auto border border-border/70 rounded-xl p-4 sm:p-6 bg-background/50",
      "aria-labelledby": "author-heading",
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          itemProp: "author",
          itemScope: true,
          itemType: "https://schema.org/Person",
          className: "flex items-start gap-4",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imageSrc,
                alt: imageAlt,
                className: "h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border border-border",
                itemProp: "image",
                loading: "lazy",
                width: 80,
                height: 80
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("p", { id: "author-heading", className: "text-sm text-muted-foreground", children: [
                "By",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: url,
                    target: "_blank",
                    rel: "noopener",
                    itemProp: "url",
                    className: "font-medium text-foreground hover:underline",
                    children: /* @__PURE__ */ jsx("span", { itemProp: "name", children: name })
                  }
                ),
                " ",
                "– ",
                /* @__PURE__ */ jsx("span", { itemProp: "jobTitle", children: jobTitle }),
                country ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  ", ",
                  country
                ] }) : null
              ] }),
              (humanPublished || humanModified) && /* @__PURE__ */ jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
                humanPublished && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("time", { itemProp: "datePublished", dateTime: datePublished, children: humanPublished }) }),
                humanPublished && humanModified ? " • Updated " : null,
                !humanPublished && humanModified ? "Updated " : null,
                humanModified && /* @__PURE__ */ jsx("time", { itemProp: "dateModified", dateTime: dateModified, children: humanModified })
              ] }),
              description && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-foreground/90", children: description })
            ] })
          ]
        }
      )
    }
  );
}
function buildAuthor(overrides) {
  const base = {
    name: "Ghaada Almain",
    url: "https://www.clippings.me/ghaadaalmain",
    jobTitle: "Copywriter Freelance",
    country: "United Arab Emirates",
    imageSrc: "/Ghaada-150x150.jpg.webp",
    imageAlt: "Ghaada Almain",
    datePublished: "2025-08-03",
    dateModified: "2025-10-20",
    description: "Hello, I’m Ghaada Almain — a multilingual legal professional turned copywriter, offering clear, practical guidance for UAE residents and visitors."
  };
  return /* @__PURE__ */ jsx(AuthorCard, { ...base, ...overrides });
}
const GhaadaAuthorCard = (props) => {
  return buildAuthor(props);
};
const BusCardRecharge = () => {
  const steps = [
    {
      title: "Choose your channel",
      description: "Top up online, at a kiosk, via retail partners, or using the mobile app.",
      icon: Sparkles
    },
    {
      title: "Select amount",
      description: "Pick a recharge value that fits your travel plans.",
      icon: CreditCard
    },
    {
      title: "Confirm & pay",
      description: "Secure checkout with instant confirmation in most cases.",
      icon: Shield
    },
    {
      title: "Tap & ride",
      description: "Validate on boarding — your balance updates with the next tap.",
      icon: Clock
    }
  ];
  const channels = [
    {
      icon: Globe,
      title: "Online Portal",
      description: "Recharge from anywhere with a simple, guided flow and digital receipt.",
      highlights: ["24/7 access", "Card lookup", "Email confirmation"],
      cta: { label: "Recharge Online", href: "#" }
    },
    {
      icon: MapPin,
      title: "Ticket Machines & Kiosks",
      description: "Self-service terminals located at major stations and hubs across the city.",
      highlights: ["Cash or card", "Instant top-up", "Multi-language"],
      cta: { label: "Find a Kiosk", href: "/locations-hafilat-recharge" }
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Manage your card on the go — check balance, add value, and get alerts.",
      highlights: ["Balance alerts", "Saved cards", "Fast repeat top-ups"],
      cta: { label: "See App Options", href: "#" }
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Quick and Easy Guide to Recharging Your Hafilat Card in Abu Dhabi" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Learn how to top up your Hafilat card in Abu Dhabi effortlessly with this complete step-by-step guide. Save time, avoid queues, and get back on the bus in minutes."
        }
      )
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative py-16 lg:py-24 bg-gradient-to-b from-primary/10 via-background to-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl lg:text-5xl font-bold text-foreground leading-tight", children: "How to Recharge Your Hafilat Card Quickly in Abu Dhabi – Easy Step-by-Step Guide" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground max-w-2xl", children: "You've just arrived in Abu Dhabi – amazing, isn't it? If you're taking a city bus, you can pay with coins — but if you plan to use it regularly, the Hafilat card is a must-have. Here's a simple guide to show you how to recharge your Abu Dhabi bus card and keep it topped up with credit." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "accent", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "#how", children: [
            "How it works",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/locations-hafilat-recharge", children: "Find recharge points" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: cn(badgeVariants({ variant: "secondary" }), "mb-4"), children: "Bus Card Recharge" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-xl", children: [
              /* @__PURE__ */ jsx(Globe, { className: "h-5 w-5 text-primary" }),
              " Online"
            ] }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Top up from anywhere" })
          ] }) }),
          /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-xl", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-primary" }),
              " Kiosk"
            ] }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Instant, self-service machines" })
          ] }) }),
          /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-xl", children: [
              /* @__PURE__ */ jsx(Smartphone, { className: "h-5 w-5 text-primary" }),
              " App"
            ] }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Recharge on the go" })
          ] }) }),
          /* @__PURE__ */ jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-xl", children: [
              /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-primary" }),
              " Secure"
            ] }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Protected payments" })
          ] }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl lg:text-3xl font-bold", children: "What is the Hafilat Card?" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-muted-foreground", children: [
        "But as a smart city explorer, you’ll probably want to enjoy its efficient, comfortable, and affordable ",
        /* @__PURE__ */ jsx("strong", { children: "Abu Dhabi public transport system" }),
        " in this ever-growing, car-loving city. The Hafilat Card is a contactless smart card used to ",
        /* @__PURE__ */ jsx("strong", { children: "pay for bus fares and transport services" }),
        " across Abu Dhabi. It’s accepted on all city and regional buses, ensuring cashless, hassle-free journeys every time."
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "how", className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl lg:text-3xl font-bold", children: "Top Ways to Recharge Your Hafilat Card" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground max-w-2xl mx-auto", children: "A simple, step-by-step guide so your next ride is just a tap away." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: steps.map((s, i) => /* @__PURE__ */ jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(s.icon, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: s.title })
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: s.description })
      ] }) }, i)) }),
      /* @__PURE__ */ jsx(Card, { className: "mt-10 max-w-3xl mx-auto bg-muted/20 border border-border/40 shadow-sm", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Hafilat Online Recharge" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "The fastest and most convenient method, perfect for residents and tech-savvy visitors:" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Go to the official website: ",
              /* @__PURE__ */ jsx("a", { href: "https://hafilat.darb.ae", target: "_blank", rel: "noopener", className: "underline", children: "hafilat.darb.ae" })
            ] }),
            /* @__PURE__ */ jsx("li", { children: "Click on 'Recharge Card'" }),
            /* @__PURE__ */ jsx("li", { children: "Enter your card's 15-digit serial number (printed on the card)" }),
            /* @__PURE__ */ jsx("li", { children: "Choose your recharge amount — typically AED 20, 50, or 100" }),
            /* @__PURE__ */ jsx("li", { children: "Pay securely with credit/debit card, Apple Pay, Google Pay, or Samsung Pay" }),
            /* @__PURE__ */ jsx("li", { children: "Receive instant confirmation and your new balance" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Pro Tip: Always double-check your card number and email address before confirming payment." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Hafilat Ticket Vending Machines (TVM)" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "For those who prefer physical transactions or need quick cash-to-card recharges:" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Find TVMs at major bus stations, shopping malls, and transport hubs" }),
            /* @__PURE__ */ jsx("li", { children: "Select your language (English/Arabic)" }),
            /* @__PURE__ */ jsx("li", { children: "Choose 'Top-up', enter your card serial number, and check your balance" }),
            /* @__PURE__ */ jsx("li", { children: "Enter the amount and choose cash or card" }),
            /* @__PURE__ */ jsx("li", { children: "Complete payment and collect your receipt" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Hafilat Recharge Mobile Apps" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Apps like Payit or Botim let you top up your Hafilat Card from your smartphone:" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Download the Payit app" }),
            /* @__PURE__ */ jsx("li", { children: "Go to UAE Bills/Recharges, select Hafilat, input your card number, choose the amount" }),
            /* @__PURE__ */ jsx("li", { children: "Pay using mobile wallet, debit/credit card, or linked bank account" }),
            /* @__PURE__ */ jsx("li", { children: "Confirm and check your card balance" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Authorized Shops & Customer Centers" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "If you prefer a face-to-face approach:" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Visit supermarkets, kiosks, or customer service centers displaying the Hafilat logo" }),
            /* @__PURE__ */ jsx("li", { children: "Hand over your card and the cash amount — staff will load it and provide a receipt" })
          ] })
        ] })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/40", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl lg:text-2xl font-semibold", children: "Recharge options" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Choose the method that suits you best." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-3 gap-6", children: channels.map((c, idx) => /* @__PURE__ */ jsxs(Card, { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(c.icon, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: c.title })
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: c.description })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "mt-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: c.highlights.map((h) => /* @__PURE__ */ jsx(Badge, { variant: "outline", children: h }, h)) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full", variant: "secondary", children: /* @__PURE__ */ jsx(Link, { to: c.cta.href, children: c.cta.label }) })
        ] })
      ] }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Good to know" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "Most top-ups reflect immediately; some online payments may take a short while to sync at the gate." }),
            /* @__PURE__ */ jsx("li", { children: "Keep your card in good condition — avoid bending or scratching the chip area." }),
            /* @__PURE__ */ jsx("li", { children: "Save receipts for travel claims or reimbursement if needed." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Fees & limits" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Recharge amounts, fees, and limits can vary by channel and are subject to change. For the latest official details, check the provider's portal or customer service." })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Separator, { className: "my-6" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Need help choosing the best option?" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/#about-hafilat", children: "About Hafilat" }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/abu-dhabi-bus-routes", children: "View Routes" }) })
        ] })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl lg:text-3xl font-bold text-center", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx(Card, { className: "mt-6", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6 space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Where can I buy a Hafilat Card?" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "At bus stations, TVMs, transport customer centers, and major supermarkets across Abu Dhabi." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "What do I do if my card runs out of balance?" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Recharge before riding! Boarding without credit is a violation and could lead to fines." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "What payment methods are accepted?" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Cash, debit/credit cards at machines and online, plus mobile wallets." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Is there a maximum balance?" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Yes, generally up to AED 150." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Can I get a refund if I leave the UAE?" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Yes, visit customer service desks at bus stations or the airport to reclaim unused balance." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Can multiple people use one card?" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No, each passenger must have their own Hafilat Card." })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-8", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx(Card, { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Final Tips for Seamless Travel" }),
      /* @__PURE__ */ jsxs("ul", { className: "mt-3 list-disc pl-6 space-y-1 text-muted-foreground", children: [
        /* @__PURE__ */ jsx("li", { children: "Always check your balance before boarding the bus." }),
        /* @__PURE__ */ jsx("li", { children: "Keep your receipt after each recharge." }),
        /* @__PURE__ */ jsx("li", { children: "Take advantage of online and app-based recharges for maximum convenience." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "With these up-to-date methods, recharging your Hafilat Card is quick, simple, and secure—helping you move around Abu Dhabi with total peace of mind." })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx(GhaadaAuthorCard, {}) }) })
  ] });
};
const LocationsHafilatRecharge = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Where to Recharge Hafilat Card in Abu Dhabi – Full Guide 2025" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Find where to recharge your Hafilat card in Abu Dhabi. Full 2025 guide with all bus stations, malls, supermarkets, and service points where you can top up your Abu Dhabi bus card easily."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://hafilatcard.online/where-recharge-hafilat-card" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-10 lg:py-16 bg-gradient-to-b from-primary/10 via-background to-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl lg:text-4xl font-bold", children: "Where to Recharge Your Hafilat Card in Abu Dhabi (Full Guide 2025)" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("strong", { children: "Updated:" }),
        " October 2025"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 text-muted-foreground", children: [
        "Whether you’ve just arrived in Abu Dhabi or you’re a daily commuter, keeping your ",
        /* @__PURE__ */ jsx("strong", { children: "Hafilat bus card topped up" }),
        " is essential for smooth travel. This complete guide lists all the official places — stations, malls, supermarkets, and service points — where you can ",
        /* @__PURE__ */ jsx("strong", { children: "recharge or buy your Hafilat card" }),
        "."
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 space-y-10", children: [
      /* @__PURE__ */ jsxs(Card, { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "1. Main Bus Stations and Ticket Vending Machines (TVM / MBME)" }),
          /* @__PURE__ */ jsxs(CardDescription, { children: [
            "You can top up your Hafilat card at the following ",
            /* @__PURE__ */ jsx("strong", { children: "bus stations" }),
            " equipped with MBME or TVM machines. These self-service kiosks accept cash or card and allow instant recharge."
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Address" }),
              /* @__PURE__ */ jsx(TableHead, { children: "City" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Type" })
            ] }) }),
            /* @__PURE__ */ jsxs(TableBody, { children: [
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi Central Bus Station (Main Terminal)" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Sultan Bin Zayed The First Street (2nd Street), Al Wahda" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Urban / Intercity" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Mussafah Shabiya Bus Station (Shabiya ME10)" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Mussafah Shabiya, near ME10" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Urban / Intercity" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Baniyas Bus Station" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Baniyas" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Urban / Intercity" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Al Shahama Bus Station" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Al Shahama" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Urban / Intercity" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi International Airport Bus Stops" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Zayed International Airport (all terminals)" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Urban / Intercity" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Al Ain Central Bus Station" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Khalifa bin Zayed Street, Central District" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Al Ain" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Urban / Intercity" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "MBZ City Bus Station" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Mohammed Bin Zayed City" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Urban" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Dalma Mall Bus Stop" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Al Wazn Street, Mussafah (next to Dalma Mall)" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Urban" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Al Mafraq Bus Station" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Al Mafraq" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Urban / Intercity" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Al Reem Island Bus Stations (various)" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Al Reem Island" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Urban" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(TableCaption, { children: "More locations appear in the Darbi/ITC map." })
          ] }),
          /* @__PURE__ */ jsx(Separator, { className: "my-6" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 text-sm text-muted-foreground space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "All these terminals have MBME or TVM top-up machines for the Hafilat card." }),
            /* @__PURE__ */ jsx("li", { children: "The Central Bus Station (Al Wahda) connects to all major routes including Dubai and Sharjah." }),
            /* @__PURE__ */ jsx("li", { children: "Airport shuttle stops are located at all Zayed International Airport terminals." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "2. Recharge Machines at Major Shopping Malls" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "You’ll also find Hafilat recharge machines inside popular shopping centers — usually near main entrances or public transport zones." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Shopping Mall" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Address" }),
              /* @__PURE__ */ jsx(TableHead, { children: "City" })
            ] }) }),
            /* @__PURE__ */ jsxs(TableBody, { children: [
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Deerfields Mall" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Sheikh Zayed Bin Sultan Street (E11), Al Bahia Area" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Al Falah Central Mall" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Al Falah" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Makani Al Shamkha Mall" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Makani Al Shamkha Shopping Centre, Al Shamkha" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Al Jimi Mall" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Hamdan Bin Mohammed Street, Al Jimi" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Al Ain" })
              ] }),
              /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsx(TableCell, { children: "Al Raha Mall" }),
                /* @__PURE__ */ jsx(TableCell, { children: "4048, Channel Street" }),
                /* @__PURE__ */ jsx(TableCell, { children: "Abu Dhabi" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Separator, { className: "my-6" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 text-sm text-muted-foreground space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "MBME top-up machines are near mall entrances or transport access points." }),
            /* @__PURE__ */ jsx("li", { children: "Some metro-connected malls may also have kiosks available (check the Darbi app map)." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "3. Supermarkets and Authorized Retailers" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "All ",
              /* @__PURE__ */ jsx("strong", { children: "Lulu Hypermarket" }),
              " branches (260+ across Abu Dhabi)"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "All ",
              /* @__PURE__ */ jsx("strong", { children: "SPAR Abu Dhabi Cooperative Society" }),
              " branches"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Lulu Exchange" }),
              " – ask at the main counter for Hafilat top-up service"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "These locations accept cash or card and provide printed receipts for confirmation." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "4. Customer Service & Support Centers" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-1 text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: "Customer service offices at main bus terminals" }),
          /* @__PURE__ */ jsx("li", { children: "Transport service satisfaction centers" }),
          /* @__PURE__ */ jsx("li", { children: "Zayed International Airport – vending machines and staff assistance available" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "5. Other Top-Up Locations" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-1 text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: "Some train or metro stations (where available)" }),
          /* @__PURE__ */ jsx("li", { children: "Automatic kiosks on main avenues and public squares" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Check the ",
            /* @__PURE__ */ jsx("a", { href: "https://www.itc.gov.ae/en", target: "_blank", rel: "noopener", className: "underline", children: "Darbi/ITC map" }),
            " for exact machine locations"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "How to Find the Nearest Hafilat Recharge Point" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-6 space-y-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Open the ",
              /* @__PURE__ */ jsx("strong", { children: "Darbi app" }),
              " (iOS or Android)."
            ] }),
            /* @__PURE__ */ jsx("li", { children: "Tap “Hafilat Services” → “Top-Up Locations.”" }),
            /* @__PURE__ */ jsx("li", { children: "View nearby MBME or TVM machines, bus stations, and malls." }),
            /* @__PURE__ */ jsx("li", { children: "The app shows real-time directions and distance." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm", children: [
            /* @__PURE__ */ jsx("strong", { children: "Darbi App Download:" }),
            " ",
            /* @__PURE__ */ jsx("a", { href: "https://play.google.com/store/apps/details?id=ae.itc.darbi", target: "_blank", rel: "noopener", className: "underline", children: "Google Play" }),
            " ",
            " | ",
            /* @__PURE__ */ jsx("a", { href: "https://apps.apple.com/ae/app/darbi/id987654321", target: "_blank", rel: "noopener", className: "underline", children: "App Store" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Summary: Best Places to Recharge Your Hafilat Card" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Location Type" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Payment Options" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Availability" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Notes" })
          ] }) }),
          /* @__PURE__ */ jsxs(TableBody, { children: [
            /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: "Bus Stations (TVM / MBME)" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Cash / Card" }),
              /* @__PURE__ */ jsx(TableCell, { children: "24/7" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Instant recharge" })
            ] }),
            /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: "Shopping Malls" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Cash / Card" }),
              /* @__PURE__ */ jsx(TableCell, { children: "10 AM – 10 PM" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Near entrances" })
            ] }),
            /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: "Supermarkets" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Cash / Card" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Store hours" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Ask at counter" })
            ] }),
            /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: "Customer Service Centers" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Cash / Card" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Office hours" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Assistance available" })
            ] }),
            /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: "Airport Terminals" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Cash / Card" }),
              /* @__PURE__ */ jsx(TableCell, { children: "24/7" }),
              /* @__PURE__ */ jsx(TableCell, { children: "Machines & help desk" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto text-sm text-muted-foreground", children: /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Official sources:" }),
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://hafilat.darb.ae/", target: "_blank", rel: "noopener", className: "underline", children: "Hafilat Recharge Portal" }),
        " • ",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://www.itc.gov.ae/en", target: "_blank", rel: "noopener", className: "underline", children: "Abu Dhabi Integrated Transport Centre (ITC)" })
      ] }) })
    ] }) })
  ] });
};
const HafilatBalanceOnline = () => {
  return /* @__PURE__ */ jsxs("section", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Check Hafilat Card Balance Online – Quick Guide" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Check your Hafilat card balance online quickly. Follow the simple steps and find direct links to the official portal."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl lg:text-4xl font-bold", children: "Check Hafilat Balance Online" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "You can check your Hafilat card balance online in seconds via the official portal. No login required." }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Steps" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Simple flow to view your current balance" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-6 space-y-2", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Go to the official portal: ",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://hafilat.darb.ae/",
                  target: "_blank",
                  rel: "noopener",
                  className: "underline",
                  children: "hafilat.darb.ae"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("li", { children: 'Click on "Recharge Card".' }),
            /* @__PURE__ */ jsx("li", { children: "Enter your Hafilat card number and submit." }),
            /* @__PURE__ */ jsx("li", { children: "Your current balance will be displayed instantly." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Tip: If you need to add funds, see ",
            " ",
            /* @__PURE__ */ jsx(Link, { to: "/bus-card-recharge", className: "underline", children: "Bus Card Recharge" }),
            " ",
            "or find ",
            " ",
            /* @__PURE__ */ jsx(Link, { to: "/locations-hafilat-recharge", className: "underline", children: "Recharge Locations" }),
            "."
          ] })
        ] })
      ] })
    ] })
  ] });
};
const App = () => /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow", children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/bus-card-recharge", element: /* @__PURE__ */ jsx(BusCardRecharge, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/abu-dhabi-bus-routes", element: /* @__PURE__ */ jsx(AbuDhabiBusRoutes, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/locations-hafilat-recharge", element: /* @__PURE__ */ jsx(LocationsHafilatRecharge, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/hafilat-balance-online", element: /* @__PURE__ */ jsx(HafilatBalanceOnline, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/old", element: /* @__PURE__ */ jsx(Index, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(Contact, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] })
] });
function render(url) {
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) })
  );
  return html;
}
export {
  render
};
