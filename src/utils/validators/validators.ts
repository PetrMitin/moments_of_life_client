class Validators {
    validateEmail(email: string) {
        const isNotEmpty = !!email
        const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        return isNotEmpty && isEmail
    }
}

export default new Validators()