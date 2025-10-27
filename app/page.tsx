"use client";

import {
  AmountDisplay,
  Button,
  Card,
  Divider,
  Dropdown,
  Input,
  Menu,
  Timeline,
  TransactionList,
} from "@/design-system/components";
import { mdiEye } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      <main
        className={`d-flex justify-content-center align-items-center w-100 h-100 gap-lg-5 ${styles.main}`}
      >
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
        <div className={`${styles.cardsWrapper} col`}>
          <Card kind="primary" spacing="regular">
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between gap-5 px-2 py-1 p-sm-5 text-light">
              <div className="d-sm-flex flex-column gap-sm-5 pe-md-5">
                <div className="d-flex flex-column gap-3">
                  <h1 className="text-h-md fw-bold">Olá, Joana! :)</h1>
                  <p className="text-b-md">Quinta-feira, 10/09/2025</p>
                </div>
                <Image
                  src="/filler_image_1.png"
                  alt=""
                  width={250}
                  height={230}
                  className="align-self-center d-none d-sm-block"
                />
              </div>

              <div className="d-flex flex-column gap-3 align-self-sm-center flex-grow-1 pb-5 ps-md-5 pe-sm-3">
                <div className="d-flex gap-5">
                  <h2 className="text-h-sm fw-bold mb-0">Saldo</h2>
                  <Icon path={mdiEye} size={1} className={styles.icon} />
                </div>
                <Divider type="highlight" />

                <AmountDisplay
                  style="light"
                  amount={2500}
                  label="Conta Corrente"
                  size="large"
                  kind="neutral"
                />
              </div>
              <Image
                src="/filler_image_1.png"
                alt=""
                width={250}
                height={230}
                className="align-self-center d-sm-none"
              />
            </div>
          </Card>

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
                  <Image
                    src="/filler_image_2.png"
                    alt=""
                    width={180}
                    height={228}
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="d-lg-none">
            <Card kind="neutral" spacing="regular">
              <div className="d-flex flex-column justify-content-center justify-content-sm-between gap-5 px-2 py-1 p-sm-5 text-primary">
                <div className="d-flex align-items-center justify-content-between">
                  <h2 className="text-h-md fw-bold">Extrato</h2>

                  <Button type="button" kind="ghost">
                    Ver mais
                  </Button>
                </div>

                <div className="d-sm-none">
                  <Timeline
                    groups={[
                      {
                        title: "Outubro 2025",
                        timelineItems: [
                          {
                            amount: 1000,
                            label: "Depósito",
                            date: "2025-10-10",
                          },
                          { amount: -200, label: "Saque", date: "2025-10-02" },
                        ],
                      },
                      {
                        title: "Novembro 2025",
                        timelineItems: [
                          {
                            amount: 500,
                            label: "Depósito",
                            date: "2025-11-05",
                          },
                        ],
                      },
                    ]}
                  />
                </div>

                <div className="d-none d-sm-block">
                  <TransactionList
                    showIcons={false}
                    transactions={[
                      {
                        id: "1",
                        amount: 1000,
                        label: "Depósito",
                        date: "2025-10-10",
                      },
                      {
                        id: "2",
                        amount: -200,
                        label: "Saque",
                        date: "2025-10-02",
                      },

                      {
                        id: "3",
                        amount: 500,
                        label: "Depósito",
                        date: "2025-11-05",
                      },
                    ]}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="d-none d-lg-block col-2 align-self-stretch">
          <Card kind="neutral">
            <div className="d-flex flex-column gap-5">
              <h2 className="text-h-md fw-bold text-primary mb-0">Extrato</h2>

              <Timeline
                groups={[
                  {
                    title: "Outubro 2025",
                    timelineItems: [
                      {
                        amount: 1000,
                        label: "Depósito",
                        date: "2025-10-10",
                      },
                      { amount: -200, label: "Saque", date: "2025-10-02" },
                    ],
                  },
                  {
                    title: "Novembro 2025",
                    timelineItems: [
                      {
                        amount: 500,
                        label: "Depósito",
                        date: "2025-11-05",
                      },
                    ],
                  },
                ]}
              />

              <Button type="button" kind="ghost">
                Ver mais
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
