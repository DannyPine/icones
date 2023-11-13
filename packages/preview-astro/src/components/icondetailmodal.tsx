import React from "react";
import { FaRegClipboard } from "react-icons/fa6";
import copy from "copy-to-clipboard";
import toast from "cogo-toast";

interface colorVariant {
  bg: string;
  fg: string;
}

const colorVariants: colorVariant[] = [
  {
    bg: "#fff",
    fg: "#000",
  },
  {
    bg: "#000",
    fg: "#fff",
  },
  {
    bg: "#ddd",
    fg: "#333",
  },
  {
    bg: "#333",
    fg: "#ddd",
  },
  {
    bg: "#ff0",
    fg: "#fff",
  },
  {
    bg: "#000",
    fg: "#ff0",
  },
  {
    bg: "#0ff",
    fg: "#fff",
  },
  {
    bg: "#000",
    fg: "#0ff",
  },
  {
    bg: "#f0f",
    fg: "#fff",
  },
  {
    bg: "#000",
    fg: "#f0f",
  },
];

export interface IconDetailModalProps {
  iconSet?: string | undefined;
  iconName?: string | null;
  component?: React.ComponentType | undefined;
  onClose?(): void;
}
export function IconDetailModal(
  props: IconDetailModalProps,
): React.ReactElement {
  const open = !!(props.iconSet && props.iconName);
  const importCode = `import { ${props.iconName} } from "react-icons/${props.iconSet}";`;
  const useCode = `<${props.iconName} />`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = props.component as React.ComponentType<any>;
  const [selectedColor, setSelectedColor] = React.useState<number>(0);
  const colorVariant = colorVariants[selectedColor];

  return (
    <Modal
      isOpen={open}
      title={`${props.iconSet}/${props.iconName}`}
      onClose={() => props.onClose?.()}
    >
      <div className="icon-detail-modal-content">
        <div
          className="icon"
          style={{ color: colorVariant?.fg, backgroundColor: colorVariant?.bg }}
        >
          {Component && <Component {...{ size: "200px" }} />}
        </div>
        <div className="colors">
          {colorVariants.map((colorVariant, i) => (
            <button
              key={i}
              className={`item${selectedColor === i ? " active" : ""}`}
              onClick={() => setSelectedColor(i)}
              style={{
                color: colorVariant?.fg,
                backgroundColor: colorVariant?.bg,
              }}
            >
              {colorVariant.bg}/{colorVariant.fg}
            </button>
          ))}
        </div>
        <h2>Codes</h2>
        <pre>
          <code>{importCode}</code>
        </pre>
        <pre>
          <code>{useCode}</code>
        </pre>
        <ul className="copy">
          {[
            props.iconSet,
            props.iconName,
            `${props.iconSet}/${props.iconName}`,
            importCode,
            useCode,
          ].map((text, i) => (
            <li key={i}>
              <button
                onClick={() => {
                  copy(text ?? "");

                  toast.success(`Copied '${text ?? ""}' to clipboard`, {
                    position: "bottom-center",
                  });
                }}
              >
                <FaRegClipboard />
                <span className="text">{text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

interface ModalProps {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?(): void;
}

function Modal({
  title,
  children,
  isOpen,
  onClose,
}: ModalProps): React.ReactElement {
  return (
    <div className={`modal-root${isOpen ? " active" : ""}`}>
      <div className="overray" onClick={() => onClose?.()}></div>
      <div className="modal-body">
        <div className="header">
          <h3 className="title">{title}</h3>
          <button className="close" onClick={() => onClose?.()}>
            x
          </button>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
