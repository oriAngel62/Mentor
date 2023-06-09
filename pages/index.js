import * as React from 'react';
import ProductCategories from '/modules/views/ProductCategories';
import ProductSmokingHero from '/modules/views/ProductSmokingHero';
import AppFooter from '/modules/views/AppFooter';
import ProductHero from '/modules/views/ProductHero';
import ProductValues from '/modules/views/ProductValues';
import ProductHowItWorks from '/modules/views/ProductHowItWorks';
import ProductCTA from '/modules/views/ProductCTA';
import AppAppBar from '/modules/views/AppAppBar';
import withRoot from '/modules/withRoot';
import { useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from "/modules/model/auth";
import {wrapper} from '/modules/store';

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params }) => {
//       // we can set the initial state from here
//       // we are setting to false but you can run your custom logic here
//       console.log("---------------------------START--------------------------------------");
//       console.log("Params", params);
//       console.log("Store", store.getState());
//       if (params?.authState) {
//         await store.dispatch(setAuthState(params.authState));
//       } else {
//         await store.dispatch(setAuthState(false));
//       }
//       console.log("State on server", store.getState());
//       console.log("-----------------------------DONE----------------------------------");
//       return {
//         props: {
//           authState: "aaa",
//         },
//       };
//     }
// );

function Index() {
  const authState = useSelector(selectAuthState);
  return (
    <React.Fragment>
        <AppAppBar />
        <ProductHero />
        <ProductValues />
        <ProductCategories />
        <ProductHowItWorks />
        <ProductCTA />
        <ProductSmokingHero />
        <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
