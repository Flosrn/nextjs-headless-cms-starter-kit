import React from "react";
import { GetStaticProps } from "next";
import { getAllPostsForHome } from "lib/api";
import LayoutPage from "components/ui/layout-page";
import { I18nProps } from "next-rosetta";
import { MyLocale } from "i18n/index";
import Blog from "components/ui/blog";

interface HomePageProps {
  preview: boolean;
  allPosts: any;
}

const HomePage: React.FC<HomePageProps> = ({ allPosts }) => {
  return (
    <LayoutPage>
      <section className="mt-3 mb-56 md:mt-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-wrap mx-auto">
          {allPosts ? (
            allPosts.map((blog) => <Blog key={blog.slug} {...blog} />)
          ) : (
            <div className="mt-10 text-center w-full text-4xl text-white">
              Page under construction...
            </div>
          )}
        </div>
      </section>
    </LayoutPage>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (context) => {
  const { preview = { preview: null } } = context;
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../i18n/${locale}`);
  try {
    const allPosts = (await getAllPostsForHome(preview)) || [];
    return { props: { table, allPosts, preview } };
  } catch (error) {
    return { props: { table, allPosts: null, preview } };
  }
};

export default HomePage;