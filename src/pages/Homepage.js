import Header from 'components/layout/Header';
import Layout from 'components/layout/Layout';
import HomeBanner from 'module/home/HomeBanner';
import HomeFeature from 'module/home/HomeFeature';
import HomeNewest from 'module/home/HomeNewest';
import React from 'react';
import styled from 'styled-components';

const Homepagestyles = styled.div`

`
const Homepage = () => {
    return (
        <Homepagestyles>
            <Layout>
                <HomeBanner></HomeBanner>
                <HomeFeature></HomeFeature>
                <HomeNewest></HomeNewest>
            </Layout>
        </Homepagestyles>
    );
};

export default Homepage;