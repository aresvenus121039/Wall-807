import V4WallScreen from '@/screens/V4/Wall/index';

import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import axios from 'axios';
import { NextSeo, NextSeoProps } from 'next-seo';
import { titleCase, getApiDestination } from '@/utility';
import _ from 'lodash';
import { cloudflareImage } from '@/utility/images';
import withAuth from '@/components/hocs/withAuth';

function V4WallPage({
  config,
  listing,
  otherWalls,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <NextSeo {...config} />
      <V4WallScreen listingDetails={listing} otherWalls={otherWalls} />
    </>
  );
}

export default V4WallPage;

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  try {
    const { params: { slug = '' } = {} } = context;
    const apiUrl = getApiDestination(process.env.ENV);
    const { data: listing } = await axios.get(apiUrl + `/listings/${slug}`);
    const { data } = await axios.get(apiUrl + `/listings/last/five`);
    const { listings: otherWalls } = data;

    const {
      info: {
        location: { coordinates = [] } = {},
        info = {},
        address = {},
        images: wallImages = [],
        title: listingTitle = '',
      } = {},
      featureImage: [{ location = '' } = {}] = [],
    } = listing;

    const title = (listingTitle || '').replace(
      /(^\w{1})|(\s+\w{1})/g,
      (letter: string) => letter.toUpperCase()
    );

    const metaTitle = `${title} | WXLLSPACE`;
    let metaDesc = `Check out this ${title}`;

    if (address && address.city) {
      metaDesc += `, located in ${address.city},`;
      if (address.state) {
        metaDesc += ` ${address.state},`;
      }
    }

    metaDesc += `, that is looking for a mural artist`;
    if (info.art_styles && info.art_styles.length) {
      metaDesc += ` who is skilled in various art styles such as ${info.art_styles.join(
        ', '
      )}.`;
    }

    return {
      props: {
        config: {
          title: metaTitle,
          description: metaDesc,
          canonical: `https://explore.wxllspace.com/wall/${slug}`,
          openGraph: {
            url: `https://explore.wxllspace.com/wall/${slug}`,
            title: metaTitle,
            description: metaDesc,
            type: 'website',
            images: [
              {
                url: cloudflareImage(location) || `/OGimages/Wall-Listing.png`,
                alt: metaTitle,
              },
            ],
          },
          twitter: {
            handle: '@wxllspace',
            site: '@wxllspace',
            cardType: 'summary_large_image',
          },
        },
        listing,
        otherWalls,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}) as GetServerSideProps<{
  config: NextSeoProps;
  listing: Record<string, any>;
  otherWalls: Array<Record<string, any>>;
}>;
