import React, { useCallback, useRef, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IdleTimer from "react-idle-timer";
import Grid from "@material-ui/core/Grid";
import NewsLetterForm from "../forms/NewsLetterForm";
import SectionTitle from "../sections/SectionTitle";
import SectionTitleLabel from "../sections/SectionTitleLabel";
import IconClose from "../icons/IconClose";
import Button from "@material-ui/core/Button";
import { SalesforceDataType } from "../forms/FormTypes";
import { useMediaQuery } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import clsx from "clsx";
import useWindowResize from "../useWindowResize";
// import { usePageStyles } from "../PageStyles";
import useTranslation from "next-translate/useTranslation";
import { SalesforcePostParams } from "../useUrlParams";

interface Props {
    title: string;
    caption: string;
    salesforceData?: SalesforcePostParams | null;
}

const useStyles = makeStyles((theme: Theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    contentMask: {
        position: 'relative',
        height: '100vh',
        width: '100%',
        padding: '40px 0',
        overflow: 'hidden',
        overflowY: 'auto',
        pointerEvents: 'none'
    },
    content: {
        position: 'relative',
        width: '100%',
        maxWidth: '680px',
        margin: '0 auto',
        backgroundColor: theme.palette.common.white,
        padding: theme.spacing(2, 2),
        pointerEvents: 'all',
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(4, 4),
        }
    },
    contentCenter: {
        top: '50%',
        transform: 'translateY(-50%)'
    },
    close: {
        position: 'absolute',
        width: '60px',
        height: '60px',
        minWidth: 'auto',
        top: 0,
        right: 0,
        padding: 0
    }
}));
const IdleNewsletterModal = ({ title, caption, salesforceData }: Props) => {
    const { lang } = useTranslation();
    const classes = useStyles();
    // const pageClasses = usePageStyles();
    const smUp = useMediaQuery(useTheme().breakpoints.up('sm'));
    const idleTimerRef = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const windowSize = useWindowResize();
    const [height, setHeight] = useState(0);
    const contentRef = useCallback(node => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    }, []);
    const onIdle = () => {
        handleModalOpen();
    };
    const handleModalOpen = () => {
        setModalIsOpen(true);
    };
    const handleModalClose = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <IdleTimer ref={idleTimerRef} timeout={5 * 60 * 1000} onIdle={onIdle} />
            <Modal open={modalIsOpen}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={modalIsOpen}>
                    <div className={classes.contentMask}>
                        <div ref={contentRef} className={clsx(
                            classes.content, (height < windowSize.height) ? classes.contentCenter : null
                        )}>
                            <Grid container spacing={smUp ? 4 : 2}>
                                <Grid item xs={12}>
                                    <SectionTitleLabel color={"warning"}>
                                        {caption}
                                    </SectionTitleLabel>
                                    <SectionTitle component={'h4'}>
                                        {title}
                                    </SectionTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <NewsLetterForm salesforceData={salesforceData} />
                                </Grid>
                            </Grid>
                            <Button onClick={handleModalClose} className={classes.close}>
                                <IconClose />
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};
export default IdleNewsletterModal;
