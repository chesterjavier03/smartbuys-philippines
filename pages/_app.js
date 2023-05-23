import { Grid, Loading } from '@nextui-org/react';
import Layout from 'components/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store/index';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showChild, setShowChild] = useState(false);

  const handleCompleteStart = useCallback(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  const handleCompleteEnd = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  useEffect(() => {
    setShowChild(true);
    // router.events.on('routeChangeStart', handleCompleteStart);
    router.events.on('routeChangeComplete', handleCompleteEnd);
    router.events.on('routeChangeError', handleCompleteEnd);

    return () => {
      // router.events.off('routeChangeStart', handleCompleteStart);
      router.events.off('routeChangeComplete', handleCompleteEnd);
      router.events.off('routeChangeError', handleCompleteEnd);
    };
  }, [handleCompleteStart, handleCompleteEnd, router.events]);

  // useEffect(() => {
  //   setShowChild(true);

  //   const handleComplete = useCallback(() => {
  //     setIsLoading(false);
  //   ), };

  //   const handleStart = () => {
  //     setIsLoading(true);
  //   };

  //   router.events.on('routeChangeStart', handleStart);
  //   router.events.on('routeChangeComplete', handleComplete);
  //   router.events.on('routeChangeError', handleComplete);
  //   return () => {
  //     router.events.off('routeChangeStart', handleStart);
  //     router.events.off('routeChangeComplete', handleComplete);
  //     router.events.off('routeChangeError', handleComplete);
  //   };
  // }, [router]);

  if (!showChild) {
    return null;
  }

  if (isLoading) {
    return (
      <Grid.Container
        fluid="true"
        responsive="true"
        justify="center"
        css={{
          paddingTop: '50vh',
        }}
      >
        <Grid>
          <Loading type="points" size="xl" color={'error'} />
        </Grid>
      </Grid.Container>
    );
  }

  return (
    <>
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Head>
              <title>
                SmartBuys Philippines | Unlocking Smarter Shopping Experiences!
              </title>
              <meta
                name="title"
                content="SmartBuys Philippines | Unlocking Smarter Shopping Experiences!"
              />
              <meta
                name="description"
                content="Discover a world of smart shopping at SmartBuys Philippines. Experience the perfect blend of quality, affordability, and convenience as you explore our curated selection of premium products. Elevate your lifestyle with our wide range of offerings, ensuring a seamless online shopping experience for the discerning Filipino shopper."
              />
              <meta
                name="keywords"
                content="Online shopping Philippines, Affordable products, Best deals and discounts, Quality products, Reliable online marketplace, Wide product selection, 
                Home essentials, Kitchenware and cookware, Electronics and gadgets, Fashion and accessories, Health and beauty products, Affordable appliances, 
                Bed and bath essentials, Convenient online shopping, Secure payment options, Fast and reliable delivery, Customer reviews and ratings, Exclusive promotions,
                Local and international brands, Trusted online marketplace,Online shopping, Affordable deals, Best prices, Quality products, Shopping in Philippines, Discounted items, 
                Consumer electronics, Fashion and accessories, Home and lifestyle, Beauty and personal care, Health and wellness, Gadgets and technology, Furniture and decor, 
                Kitchen appliances, Fast delivery, Secure transactions, Customer reviews, Exclusive offers, Cash on delivery, Local and international brands,
                Bodega Sale Everyday, Negosyo Package Disney Terno and Dress with Tags, Disney Terno and Dress with Tags, Negosyo Package Disney Terno and Dress, 
                mall pull out warehouse philippines, bodega warehouse mall pull out, bodega sale, bodega philippines, bodega sale philippines, 
                bodega sale divisoria, mall pull out items, mall pull out supplier, mall pull out warehouse, mall pull out and overruns, authentic mall pull out, 
                mall pull out bodega, mall pull out warehouse in manila, mall pull out bodega philippines, mall pull out baby clothes warehouse, mall pull out clothes, 
                mall pull out bodega, mall pull out clothes warehouse, mall pull out clothes supplier, mall pull out warehouse philippines, manila bodega overruns,
                mall pull out clothes factory, mall pull out direct supplier, mall pull out original, bodega sale mall pullouts las pinas,
                mall pull out factory, original mall pull out, mall pull out legit, warehouse mall pull out, Bodega, Home Essential, Kids Aparrel, Warehouse Sale, 
                Bodega Sale, Filipino Home, las pinas mall pull out, las pinas bodega sale, Quality Products, Baby Clothes, Toddler Clothes, Mall Pull-Out, Divisoria, Sale"
              />
              <meta
                property="og:title"
                content="SmartBuys Philippines | Unlocking Smarter Shopping Experiences!"
              />
              <meta
                property="og:description"
                content="Discover a world of smart shopping at SmartBuys Philippines. Experience the perfect blend of quality, affordability, and convenience as you explore our curated selection of premium products. Elevate your lifestyle with our wide range of offerings, ensuring a seamless online shopping experience for the discerning Filipino shopper."
              />
              <meta
                property="og:keywords"
                content="Online shopping Philippines, Affordable products, Best deals and discounts, Quality products, Reliable online marketplace, Wide product selection, 
                Home essentials, Kitchenware and cookware, Electronics and gadgets, Fashion and accessories, Health and beauty products, Affordable appliances, 
                Bed and bath essentials, Convenient online shopping, Secure payment options, Fast and reliable delivery, Customer reviews and ratings, Exclusive promotions,
                Local and international brands, Trusted online marketplace,Online shopping, Affordable deals, Best prices, Quality products, Shopping in Philippines, Discounted items, 
                Consumer electronics, Fashion and accessories, Home and lifestyle, Beauty and personal care, Health and wellness, Gadgets and technology, Furniture and decor, 
                Kitchen appliances, Fast delivery, Secure transactions, Customer reviews, Exclusive offers, Cash on delivery, Local and international brands,
                Bodega Sale Everyday, Negosyo Package Disney Terno and Dress with Tags, Disney Terno and Dress with Tags, Negosyo Package Disney Terno and Dress, 
                mall pull out warehouse philippines, bodega warehouse mall pull out, bodega sale, bodega philippines, bodega sale philippines, 
                bodega sale divisoria, mall pull out items, mall pull out supplier, mall pull out warehouse, mall pull out and overruns, authentic mall pull out, 
                mall pull out bodega, mall pull out warehouse in manila, mall pull out bodega philippines, mall pull out baby clothes warehouse, mall pull out clothes, 
                mall pull out bodega, mall pull out clothes warehouse, mall pull out clothes supplier, mall pull out warehouse philippines, manila bodega overruns,
                mall pull out clothes factory, mall pull out direct supplier, mall pull out original, bodega sale mall pullouts las pinas,
                mall pull out factory, original mall pull out, mall pull out legit, warehouse mall pull out, Bodega, Home Essential, Kids Aparrel, Warehouse Sale, 
                Bodega Sale, Filipino Home, las pinas mall pull out, las pinas bodega sale, Quality Products, Baby Clothes, Toddler Clothes, Mall Pull-Out, Divisoria, Sale"
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" href="/favicon.png" />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </>
  );
};

export default App;
