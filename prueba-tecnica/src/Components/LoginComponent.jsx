import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField, Button, Box, Typography } from "@mui/material";
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { iniciarSesion } from "../redux/UsuriosDuck";
const LoginComponent = (props) => {
  const history = useHistory();
  const login = useSelector(store => store.Usuario.login)
  console.log('los login son  ', login)

  const handleLogin = async (values) => {
    const { email, password } = values;
    console.log('los datos son  ', values)
    let credenciales = {

      correoelectronico: values.email,
      contrasena: values.password
    }
    let resultado = await dispatch(iniciarSesion(credenciales))
    console.log('los datos de resultado ', resultado)
    if (resultado.payload) {
      //history.push("/Usuarios");
      props.history.push('/Usuarios')
      window.location.reload();
    } else {
      alert("Credenciales incorrectas");
    }
  };
  const dispatch = useDispatch()

  const validate = async (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El correo electrónico no es válido";
    }
    if (!values.password) {
      errors.password = "La contraseña es requerida";
    } else if (values.password.length < 3) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    return errors;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          width: { xs: "90%", sm: "400px" }, // Responsividad para pantallas pequeñas
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <div>Para tu protección, por favor verifica tu identidad.</div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={validate}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field
                  name="email"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="email"
                      error={!!props?.errors?.email}
                      helperText={<ErrorMessage name="email" />}
                    />
                  )}
                />
              </div>

              <div>
                <Field
                  name="password"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Contraseña"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="password"
                      error={!!props?.errors?.password}
                      helperText={<ErrorMessage name="password" />}
                    />
                  )}
                />
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default withRouter(LoginComponent);
