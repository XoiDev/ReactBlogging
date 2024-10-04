import { Button } from 'components/button';
import React from 'react';
import styled from 'styled-components';

const HomebanerStyles = styled.div`
    min-height: 520px;
    background-image: linear-gradient(to right bottom, ${props => props.theme.primary},
    ${props => props.theme.secondary});
    padding: 40px 0;
    
  
    .banner{
        display:flex;
        justify-content: space-between;
        align-items: center;

        &-content{
        max-width: 600px;
        color:white
        }

        &-heading{
            font-size: 36px;
            margin-bottom: 20px;
        }

        &-desc{
            line-height: 1.75;
            margin-bottom: 40px;
        }
        #btn-banner{
            background-image: yellow
        }
    }

    
`
console.log("run");

const HomeBanner = () => {
    return (
        <HomebanerStyles>
            <div className='container'>
                <div className="banner">
                    <div className="banner-content">
                        <h1 className='banner-heading'>Monkey Blogging</h1>
                        <p className='banner-desc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla consequatur debitis illum ipsa itaque eveniet nam, modi voluptatem facilis molestias culpa, quibusdam perspiciatis optio cumque dolor consequuntur, eius similique alias sint facere! Maiores alias dignissimos reprehenderit iusto ipsam beatae perspiciatis!</p>
                        <Button  id="btn-banner" to="/sign-up">Get Started</Button>
                    </div>
                    <div className="banner-image"><img src="/banner.png" alt="banner" /></div>
                </div>
            </div>
        </HomebanerStyles>

    );
};

export default HomeBanner;