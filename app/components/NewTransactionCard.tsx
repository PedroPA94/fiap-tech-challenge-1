import { Card, Dropdown, Input, Button } from "@/design-system/components";
import Image from "next/image";

export function NewTransactionCard() {
  return (
    <Card kind="secondary" spacing="regular">
      <div className="d-flex flex-column justify-content-center justify-content-sm-between gap-5 px-2 py-1 p-sm-5 text-primary">
        <h2 className="text-h-md fw-bold">
          Nova transação em {new Date().toLocaleDateString()}
        </h2>

        <div className="d-flex flex-column flex-sm-row gap-5 justify-content-sm-between">
          <div className="d-flex flex-column gap-5">
            <Dropdown
              label="Tipo de transação"
              placeholder="Selecione"
              options={[{ value: 1, content: "Teste" }]}
              labelColor="text-primary"
            />

            <Input
              label="Valor"
              labelColor="text-primary"
              placeholder="Informe o valor da transação"
              required
              type="text"
            />

            <Button type="button">Concluir transação</Button>
          </div>
          <div className="pt-5 align-self-center align-self-sm-end">
            <Image src="/filler_image_2.png" alt="" width={180} height={228} />
          </div>
        </div>
      </div>
    </Card>
  );
}
