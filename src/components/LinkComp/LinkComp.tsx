import Link from "next/link";

interface LinkCompProps {
  url?: string;
  children?: any;
  linkClass?: string;
}

const LinkComp = ({ children, url, linkClass }: LinkCompProps) => {
  return (
    <Link href={url}>
      <a className={linkClass}>{children}</a>
    </Link>
  );
};

export default LinkComp;
