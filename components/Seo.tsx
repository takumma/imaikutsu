import Head from "next/head";

export type SeoProps = {
  title?: string;
};

const Seo = ({ title }: SeoProps) => {
  const defaultTitle = "imaikutsu?";

  const pageTitle = title ? `${title} / ${defaultTitle}` : defaultTitle;
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </Head>
  );
};

export default Seo;
