import { Card, Menu } from "@/design-system/components";

export function SidebarMenu() {
  return (
    <div className="d-none d-lg-block col-2 align-self-stretch">
      <Card kind="neutral">
        <div className="d-flex text-align-center justify-content-center">
          <Menu
            navigationItems={[
              { content: "Início", link: "/" },
              { content: "Transações", link: "" },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
