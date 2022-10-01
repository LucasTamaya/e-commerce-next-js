import Head from "next/head";

interface Props {
  title: string;
  content: string;
}

const HeadStructure: React.FC<Props> = ({ title, content }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Head>
  );
};

export default HeadStructure;
