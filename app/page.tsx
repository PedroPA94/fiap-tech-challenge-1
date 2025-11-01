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
import { useUser } from "./UserProvider";
import { useEffect, useState } from "react";
import { Transaction } from "./lib/interfaces";
import { TimelineGroupProps } from "@/design-system/components/Timeline/TimelineGroup/TimelineGroup";
import { TimelineItemProps } from "@/design-system/components/Timeline/TimelineItem/TimelineItem";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function Home() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [timelineGroups, setTimelineGroups] = useState<TimelineGroupProps[]>(
    []
  );

  const updateBalance = (transactions: Transaction[]) => {
    const balance = transactions.reduce((acc, cur) => {
      acc += cur.value;
      return acc;
    }, 0);
    setBalance(balance);
  };

  const updateTimeline = (transactions: Transaction[]) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const grouped = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.timestamp);
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const title = `${month} ${year}`;

      if (!acc[title]) {
        acc[title] = [];
      }

      acc[title].push({
        amount: transaction.value,
        label: transaction.type,
        date: date.toLocaleDateString("pt-BR"),
      });

      return acc;
    }, {} as Record<string, TimelineItemProps[]>);

    const result = Object.entries(grouped)
      .map(([title, timelineItems]) => ({
        title,
        timelineItems: timelineItems.sort(
          (a, b) =>
            new Date(b.date.split("/").reverse().join("-")).getTime() -
            new Date(a.date.split("/").reverse().join("-")).getTime()
        ),
      }))
      // Ordenar grupos por data decrescente
      .sort((a, b) => {
        const [monthA, yearA] = a.title.split(" ");
        const [monthB, yearB] = b.title.split(" ");

        const dateA = new Date(`${yearA}-${months.indexOf(monthA) + 1}-01`);
        const dateB = new Date(`${yearB}-${months.indexOf(monthB) + 1}-01`);

        return dateB.getTime() - dateA.getTime();
      });

    setTimelineGroups(result);
  };

  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      const res = await fetch(
        `${BASE_URL}/api/transactions?userId=${user.userId}`
      );
      const data = await res.json();
      setTransactions(data);
      updateBalance(data);
      updateTimeline(data);
    };

    fetchTransactions();
  }, [user]);

  const getFormattedToday = () => {
    const today = new Date();

    const formatted = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(today);

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

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
                  <h1 className="text-h-md fw-bold">
                    Olá {user ? ", " + user.firstname : ""}! :)
                  </h1>
                  <p className="text-b-md">{getFormattedToday()}</p>
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
                  amount={balance}
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
                  <Timeline groups={timelineGroups} />
                </div>

                <div className="d-none d-sm-block">
                  <TransactionList
                    showIcons={false}
                    transactions={transactions?.map((t) => ({
                      id: t.id,
                      amount: t.value,
                      label: t.type,
                      date: t.timestamp.substring(0, 10),
                    }))}
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

              <Timeline groups={timelineGroups} />

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
