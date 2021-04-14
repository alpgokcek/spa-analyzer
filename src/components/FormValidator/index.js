import validator from 'validator';

const FormValidator = {
    /**
     * Validate input element
     * @param element Dome element of the input
     * Uses the following attributes
     *     data-validate: array in json format with validation methods
     *     data-param: used to provide arguments for certain methods.
     */
    validate(element) {

        const isCheckbox = element.type === 'checkbox';
        const value = isCheckbox ? element.checked : element.value;
        const name = element.name;

        if (!name) throw new Error('Input name must not be empty.');
        const param = element.getAttribute('data-param');
        const validations = JSON.parse(element.getAttribute('data-validate'));

        let result = []
        if(validations && validations.length) {
            validations.forEach(m => {
                switch (m) {
                    case 'required':
                        result[m] = isCheckbox ? value === false : validator.isEmpty(value)
                        break;
                    case 'non-numeric':
                        result[m] = !/^[A-Za-z_ğüşıöçĞÜŞİÖÇ\s]*$/.test(value)
                        break;
                    case 'email':
                        result[m] = !validator.isEmail(value)
                        break;
                    case 'number':
                        result[m] = !validator.isNumeric(value)
                        break;
                    case 'phoneNumber':
                        result[m] = !/^[^0]{1}\d{9}$/.test(value)
                        break;
                    case 'tckn':
                        if(value.length !== 11 || value[0] === 0 || !validator.isNumeric(value)){
                            result[m] = true
                            break;
                        }
                        const odd = (parseInt(value[0]) + parseInt(value[2]) + parseInt(value[4]) + parseInt(value[6]) + parseInt(value[8]))*7;
                        const even = parseInt(value[1]) + parseInt(value[3]) + parseInt(value[5]) + parseInt(value[7]);
                        const sub_result = Math.abs(odd - even);

                        let tckn_sum = 0;
                        for (let i = 0; i < 10; i++) tckn_sum += parseInt(value[i]);
                        if (sub_result % 10 != value[9] || tckn_sum % 10 != value[10]){
                            result[m] = true
                            break;
                        }
                        result[m] = false
                        break;
                    case 'integer':
                        result[m] = !validator.isInt(value)
                        break;
                    case 'alphanum':
                        result[m] = !validator.isAlphanumeric(value)
                        break;
                    case 'url':
                        result[m] = !validator.isURL(value)
                        break;
                    case 'equalto':
                        // here we expect a valid ID as param
                        const value2 = document.getElementById(param).value;
                        result[m] = !validator.equals(value, value2)
                        break;
                    case 'minlen':
                        result[m] = !validator.isLength(value, { min: param })
                        break;
                    case 'maxlen':
                        result[m] = !validator.isLength(value, { max: param })
                        break;
                    case 'len':
                        const [min, max] = JSON.parse(param)
                        result[m] = !validator.isLength(value, { min, max })
                        break;
                    case 'min':
                        result[m] = !validator.isInt(value, { min: validator.toInt(param) })
                        break;
                    case 'max':
                        result[m] = !validator.isInt(value, { max: validator.toInt(param) })
                        break;
                    case 'list':
                        const list = JSON.parse(param)
                        result[m] = !validator.isIn(value, list)
                        break;
                    default:
                        throw new Error('Unrecognized validator.');
                }

            })
        }

        return result;
    },

    /**
     * Bulk validation of input elements.
     * Used with form elements collection.
     * @param  {Array} inputs Array for DOM element
     * @return {Object}       Contains array of error and a flag to
     *                        indicate if there was a validation error
     */
    bulkValidate(inputs) {
        let errors = {},
            hasError = false;

        inputs.forEach(input => {
            try{
            let result = this.validate(input)
            errors = { ...errors, [input.name]: result }
            if (!hasError) hasError = Object.keys(result).some(val => result[val])
            } catch {
                ;
            }
        })

        return {
            errors,
            hasError
        }
    }
}

export default FormValidator;