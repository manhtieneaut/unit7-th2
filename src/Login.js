import { useState } from "react";
import { useForm } from 'react-hook-form';

export default function Login() {
    //
    const [values, setValues] = useState({
        email: '', password: '', confirmPassword: '', isRead: false,
    });
    const { register, handleSubmit, formState: { errors }, watch } = useForm();


    // / add function when value change
    const handleChange = (event) => {
        event.persist();

        if (event.target.name === 'isRead') {
            setValues({
                ...values,
                [event.target.name]: !values.isRead,
            });
        } else {
            setValues({ ...values, [event.target.name]: event.target.value });
        }
    };




    const stringJson = JSON.stringify(values);
    return (
        <div className="container" style={{ width: "500px", height: "500px", backgroundColor: "gray", marginLeft: "35%" }}>
            <h1 style={{ width: "100%", borderBottom: "1px solid", textAlign: "center" }}>Đăng ký</h1>
            <form onSubmit={handleSubmit((data) => console.log(data))} >
                <input
                    style={{ width: "90%", height: "30px", border: "1px solid", textAlign: "center", marginTop: "10px", marginLeft: "20px" }}
                    placeholder="Email"
                    {...register('email', {
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}
                />{errors?.email && <div> {errors?.email?.message}</div>}
                <input
                    style={{ width: "90%", height: "30px", border: "1px solid", textAlign: "center", marginTop: "10px", marginLeft: "20px" }}
                    placeholder="Password"
                    {...register('password', {
                        required: "Required",
                        min: {
                            value: 3,
                            message: 'min length is 3'
                        },
                        max: {
                            value: 20,
                            message: 'min length is 20'
                        },
                    })}
                />{errors?.password && <div> {errors?.password?.message}</div>}
                <input
                    style={{ width: "90%", height: "30px", border: "1px solid", textAlign: "center", marginTop: "10px", marginLeft: "20px" }}
                    placeholder="ConfirmPassword"
                    {...register('confirmPassword', {
                        required: "Required",
                        min: {
                            value: 3,
                            message: 'min length is 3'
                        },
                        max: {
                            value: 20,
                            message: 'min length is 20'
                        },
                        validate: (val) => {
                            if (watch('password') !== val) {
                              return "Your passwords do no match";
                            }
                          },

                    })}
                />  {errors?.confirmPassword && <div> {errors?.confirmPassword?.message}</div>}
                <br />



                <label>
                    <input {...register('isRead', {required: "Required",})} type="checkbox" />I read and accept the privacy policy:
                </label>
                <br />
                <button style={{ marginLeft: "43%", marginTop: "10px" }}>Submit</button>
            </form>
            <div className="show-json-string-setValues" style={{ marginLeft: "20px", marginTop: "10px" }}>{stringJson}</div>

        </div>
    );
}
