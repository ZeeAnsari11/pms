import React from 'react';
import {
    PricingContainer,
    PricingH1,
    PricingWrapper,
    PricingCard,
    PricingH2,
    PricingH3,
    PricingP,
    PricingBtn,
    Pricingul,
    Pricingli
} from './PricingElements';
import {FaCheck} from 'react-icons/fa';

const Pricing = () => {

    const checkIconColor = "#1677FF";
    return (
        <PricingContainer id='pricing'>
            <PricingH1>Pricing Plans</PricingH1>
            <PricingWrapper>

                <PricingCard>
                    <PricingH2>Free</PricingH2>
                    <PricingP><strong>$0</strong> per user</PricingP>
                    <PricingP><strong>$0 monthly total</strong></PricingP>
                    <PricingBtn to="/">Get it Now</PricingBtn>
                    <PricingH3>This plan includes:</PricingH3>
                    <Pricingul>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> Up to 10 users
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> Unlimited Project Boards
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/>Backog and Timeline
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> Reporting and insights
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> 2 GB of storage
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> Community support
                        </Pricingli>
                    </Pricingul>
                </PricingCard>

                <PricingCard>
                    <PricingH2>Standard</PricingH2>
                    <PricingP><strong>$7.75</strong> per user</PricingP>
                    <PricingP><strong>$77.50 monthly total</strong></PricingP>
                    <PricingBtn to="/">Start Trial</PricingBtn>
                    <PricingH3>Everything from Free plan, plus:</PricingH3>
                    <Pricingul>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> Up to 35,000 users
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> User roles & permissions
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> Audit logs
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> Data residency
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> 250 GB of storage
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> Business hour support
                        </Pricingli>
                    </Pricingul>
                </PricingCard>


                <PricingCard>
                    <PricingH2>Premium</PricingH2>
                    <PricingP><strong>$15.25</strong> per user</PricingP>
                    <PricingP><strong>$152.50 monthly total</strong></PricingP>
                    <PricingBtn to="/">Start Trial</PricingBtn>
                    <PricingH3>Everything from Standard plan, plus:</PricingH3>
                    <Pricingul>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> Advanced roadmaps
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/> Sandbox & release tracks
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/>Project archiving
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/>Guaranteed uptime SLA
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/>Unlimited storage
                        </Pricingli>
                        <Pricingli>
                            <FaCheck color={checkIconColor}/>24/7 Premium support
                        </Pricingli>
                    </Pricingul>
                </PricingCard>

            </PricingWrapper>
        </PricingContainer>
    );
};

export default Pricing;
