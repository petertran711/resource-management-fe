import React from "react";
import Head from "next/head";
import { Button, ButtonProps, Col, PageHeader, Row } from "antd";
import s from "./index.module.css";
import NextLink from "next/link";

interface ContentButtonProps extends ButtonProps {
  text?: string;
  visible?: boolean;
  icon?: JSX.Element;
}

interface Props {
  title?: string;
  onBack?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  subTitle?: string;
  buttons?: ContentButtonProps[];
  endButtons?: ContentButtonProps[];
  children?: any;
  className?: string;
  footer?: JSX.Element;
}

const Content = ({
  title,
  onBack,
  buttons,
  children,
  subTitle,
  endButtons,
  footer
}: Props) => {
  let extraButtons: ContentButtonProps[] = [];
  if (buttons) {
    extraButtons = [...extraButtons, ...buttons];
  }
  if (endButtons) {
    extraButtons = [...extraButtons, ...endButtons];
  }
  return (
    <>
      {title ? (
        <Head>
          <title>{title}</title>
        </Head>
      ) : null}
      <PageHeader
        ghost={false}
        onBack={onBack}
        title={title}
        subTitle={subTitle}
        extra={extraButtons.map((button, index) => {
          if (button.href)
            return (
              <NextLink href={button.href} key={`end_button_${button.href}`}>
                <Button
                  key={`content-button-${index}`}
                  type={button.type}
                  icon={button.icon}
                  className={button.className}
                >
                  {button.text}
                </Button>
              </NextLink>
            );
          return (
            <Button
              key={`content-button-${index}`}
              type={button.type}
              onClick={button.onClick}
              icon={button.icon}
              className={button.className}
            >
              {button.text}
            </Button>
          );
        })}
        footer={footer}
      />
      <Row
        style={{
          margin: 24
        }}
      >
        <Col span={24} className={s.root}>
          {children}
        </Col>
      </Row>
    </>
  );
};

export default Content;
