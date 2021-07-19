import React, { useEffect, useState } from 'react';
import Sticky from "react-sticky-el";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core";
import Container from "../../containers/Container";
import Box from "@material-ui/core/Box";
import SectionContainer from "../../containers/SectionContainer";
import SectionLabel from "../SectionLabel";
import SectionTitleLabel from "../SectionTitleLabel";
import SectionTitle from "../SectionTitle";
import SectionDescWrapper from "../SectionDescWrapper";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import useTranslation from "next-translate/useTranslation";


type IListItem = {
    value: string,
    desc: string
}
const useStyles = makeStyles((theme: Theme) => ({
    sectionOuter: {},
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        paddingTop: '40px',
        paddingBottom: '40px',
        [theme.breakpoints.up('md')]: {
            height: '100vh'
        }
    },
    titleWrapper: {
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            paddingRight: '20px'
        }
    },
    bgColor: {
        position: 'absolute',
        width: 'calc(100% + 40px)',
        height: '100%',
        top: 0,
        left: '-20px',
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.up('md')]: {
            width: '100%'
        }
    },
    scrollArea: {
        display: 'block',
        width: '1px',
        height: '100vh'
    },
    valueList: {
        '& li': {
            marginBottom: '40px',
            '&:last-child': {
                marginBottom: 0
            }
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100vh',
            // paddingLeft: '20px'
        }
    },
    value: {
        fontSize: theme.typography.pxToRem(32),
        lineHeight: 1.17,
        fontWeight: 700,
        letterSpacing: 'normal',
        color: theme.palette.error.main,
        marginBottom: '5px',
        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(60)
        }
    }
}));
const HomeFoundation = () => {
    const classes = useStyles();
    const { t, lang } = useTranslation();
    const mdUp = useMediaQuery(useTheme().breakpoints.up('md'));

    const [list, setList] = useState<IListItem[] | null>(null);
    useEffect(() => {
        setList([
            {
                value: '400&nbsp;+',
                desc: t('home:Trusted by over 400 clients__')
            },
            {
                value: '120&nbsp;+',
                desc: t('home:Earned 120+ accreditations__')
            },
            {
                value: '23,000&nbsp;+',
                desc: t('home:Managed 23,000 terabytes network__')
            }
        ]);
    }, [lang]);

    const getTitle = () => {
        return (
            <div className={classes.wrapper}>
                <span className={classes.bgColor} />
                <Box width="100%" className={classes.titleWrapper}>
                    <Box width="100%" display={'flex'} justifyContent={(mdUp) ? 'flex-end' : 'flex-start'}>
                        <Container maxWidth={{ xs: 'none', sm: 600, md: 600 }} paddingX={false} centerX={false}>
                            <SectionTitleLabel color={'primary'} />
                            <SectionTitle>
                                {t('home:Laying the foundation from Cloud')}
                            </SectionTitle>
                        </Container>
                    </Box>
                    <SectionLabel>FOUNDATION</SectionLabel>
                </Box>
            </div>
        )
    };
    return (
        <SectionContainer margin={false} className={'foundation'}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        {
                            (mdUp)
                                ?
                                <Sticky boundaryElement={'.foundation'}>
                                    {getTitle()}
                                </Sticky>
                                :
                                getTitle()
                        }
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Container maxWidth={{ md: 600 }} paddingX={false} centerX={false}>
                            <SectionDescWrapper>
                                <Hidden smDown>
                                    <span className={classes.scrollArea} />
                                </Hidden>
                                {
                                    (list && list.length)
                                        ?
                                        <ul className={classes.valueList}>
                                            {
                                                list.map((item: IListItem, index: number) => {
                                                    return (
                                                        <li key={index}>
                                                            <Typography variant={'h3'} className={classes.value} dangerouslySetInnerHTML={{ __html: item.value }} />
                                                            <Typography variant={"body1"} component={'div'}>
                                                                {item.desc}
                                                            </Typography>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        :
                                        null
                                }
                            </SectionDescWrapper>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </SectionContainer>
    );
};
export default HomeFoundation;
