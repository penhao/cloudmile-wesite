import React from 'react';
import SectionContainer from "../containers/SectionContainer";
import Container from "../containers/Container";
import Grid from "@material-ui/core/Grid";
import SectionTitleLabel from "./SectionTitleLabel";
import SectionTitle from "./SectionTitle";
import DownloadForm from "../forms/DownloadForm";
import useTranslation from "next-translate/useTranslation";
import { SalesforceDataType } from "../forms/FormTypes";
import { SalesforcePostParams } from "../useUrlParams";


interface Props {
    parentPage: string;
    title: string;
    salesforceData: SalesforcePostParams | null;
}

const Download = ({ parentPage, title, salesforceData }: Props) => {
    const { t } = useTranslation();
    return (
        <SectionContainer>
            <Container maxWidth={{ xs: 'none', sm: 'none', md: 1280 }}>
                <Grid container spacing={4} direction={"row-reverse"}>
                    <Grid item xs={12} md={6}>
                        <Container maxWidth={{ xs: 'none', sm: 600, md: 600 }} paddingX={false} centerX={false}>
                            <SectionTitleLabel color={'warning'}>
                                {t(`${parentPage}:Download Now`)}
                            </SectionTitleLabel>
                            <SectionTitle component={'h4'}>
                                {title}
                            </SectionTitle>
                        </Container>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DownloadForm salesforceData={salesforceData} />
                    </Grid>
                </Grid>
            </Container>
        </SectionContainer>
    );
};
export default Download;
