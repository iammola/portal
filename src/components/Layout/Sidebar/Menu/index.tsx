import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

export const Menu: React.FC = () => {
  return (
    <NavigationMenuPrimitive.Root orientation="vertical">
      <NavigationMenuPrimitive.List className="w-full grow space-y-2 p-4" />
      <NavigationMenuPrimitive.Viewport />
    </NavigationMenuPrimitive.Root>
  );
};
