
export const initModalProps = {
    open: false,
    type: "",
    email: "",
    password: "",
    activeStep: 0
};

export const steps = [
    "Verify Password",
    "Change Email",
    "Finished"
];

export const getStepContent = (step) => {
    switch (step) {
        case 0:
            return "Verify your password to proceed";
        case 1:
            return "Enter your new email";
        case 2:
            return "You're finished!";
        default:
            return "Unkown step";
    }
};