import { useTheme } from '@material-ui/core/styles';

const theme = useTheme();

export const container : any = {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '20% 10% 10% 10%',
    minHeight: '100vh'
};

export const alignmentContainer : any = {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
};
export const bookPaper : any = {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    background: 'rgb(255, 255, 255, 0.5)',
    padding: '0% 0% 0% 0%',
    borderRadius: '12px',
    [theme.breakpoints.up('lg')]: {
        width: '45%'
    },
    [theme.breakpoints.down('md')]: {
        width: '60%',
        padding: '0% 0% 0% 0%',
    },
    [theme.breakpoints.down('xs')]: {
        width: '100%',
        padding: '0% 0% 0% 0%'
    },
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 2px 2px 3px 0px rgba(0,0,0,0.14), 2px 2px 3px 1px rgba(0,0,0,0.12), 0px 1px 3px 0px rgba(0,0,0,0.12), 0px 1px 3px 0px rgba(0,0,0,0.12)"
};

export const paper : any = {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '5%',
    width: '40%',
    borderRadius: 10,
    boxShadow: '2px 1px 5px 1px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
        width: '60%'
    },
    [theme.breakpoints.down('xs')]: {
        width: '80%'
    },
};

export const imagesGridList : any = {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: '100%',
    marginBottom: '20px !important'
};

export const imagesTitleBar : any = {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
};

export const imagesTitle : any = {
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
};

export const modal : any = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '10%',
    width: '95%'    
};

export const button : any = {
    width: '100%',
    padding: 10,
    backgroundColor: '#21ce99',
    color: 'white',
    transition: 'background-color 0.4s ease',
    '&:hover': {
        backgroundColor: '#13ab7d',
        color: 'white'
    }
};

export const divider : any = {
    marginBlockStart: '0.5em',
    width: '60%',
    marginBottom: 20,
    backgroundColor: 'rgb(0, 0, 0, 0.2)'    
};

export const inputs = {
    width: '100%',
    marginBottom: 20
};

export const underline : any = {
    '&:before': {
        borderBottom: '1px solid #21ce99'
    },
    '&:after': {
        borderBottom: `2px solid #21ce99`
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: `2px solid #f50057`
    },
    '&.MuiFormLabel-root': {
        color: '#21ce99'
    },
    '&.MuiFormLabel-root .Mui-focused': {
        color: '#21ce99'
    }
};

export const label : any = {
    color: '#21ce99 !important',
};
