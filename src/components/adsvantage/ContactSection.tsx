import React from 'react'
import { useTranslation } from 'next-translate';
import { useInView } from 'react-hook-inview';
import Container from "../containers/Container";
import Grid from "@material-ui/core/Grid";
import SectionTitleLabel from "../sections/SectionTitleLabel";
import SectionTitle from "../sections/SectionTitle";
import SectionContainer from "../containers/SectionContainer";
import ProductForm from "../../components/forms/ProductForm";

interface Props {
    scrollChangeHadler: (target: string | null) => void;
}
function ContactSection({ scrollChangeHadler }: Props) {
    const { t, lang } = useTranslation();
    const [ref, inView] = useInView(
        {
            onEnter: () => scrollChangeHadler('contact'),
            onLeave: () => scrollChangeHadler(null)
        },
    )
    return (
        <div ref={ref}>
            <SectionContainer>
                <Container maxWidth={{ xs: 'none', sm: 'none', md: 1280 }}>
                    <Grid container spacing={4} direction={"row-reverse"}>
                        <Grid item xs={12} md={6}>
                            <Container maxWidth={{ xs: 'none', sm: 600, md: 600 }} paddingX={false}
                                centerX={false}>
                                <SectionTitleLabel color={'secondary'}>
                                    {t('adsvantage:Please contact us')}
                                </SectionTitleLabel>
                                <SectionTitle component={'h4'}>
                                    {t('adsvantage:Let us help you grow the business')}
                                </SectionTitle>
                            </Container>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ProductForm currentPage={'adsvantage'} />
                        </Grid>
                    </Grid>
                </Container>
            </SectionContainer>
        </div>
    )
}

export default ContactSection
