interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  classnames?: string;
  onClick?: () => void;
}

export default function Button({ children, color = "bg-blue-500", onClick, classnames }: ButtonProps) {
  return (
    <button className={`${color} text-white px-4 py-2 rounded ${classnames}`} onClick={onClick}>{children}</button>
  );
}