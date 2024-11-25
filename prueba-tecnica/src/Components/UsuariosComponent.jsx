import { withRouter } from 'react-router-dom'
import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import { Formik, Form, Field, FieldArray } from "formik";
import {
    TextField,
    Button,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
import * as Yup from "yup";
function UsuariosComponent() {

    const levelsOfEducation = [
        "Primaria",
        "Secundaria",
        "Preparatoria",
        "Universidad",
      ];
    const columns = [
        { field: 'id', headerName: 'ID', headerAlign: 'center', width: 350, sortable: false },
        { field: 'nombre', headerName: 'Nombre', headerAlign: 'center', width: 350, sortable: false },
        {
            field: 'curp', headerName: 'Curp', headerAlign: 'center', width: 620, sortable: false
        },
        {
            field: 'accion', headerName: 'Acción', headerAlign: 'center', width: 100, sortable: false,
            renderCell: (params) =>
            (
                <div>
                    <button className={'btn btn-outline-success ms-1'}>✓</button>
                    <button className={'btn btn-outline-danger ms-2'}>X</button>
                </div>
            )
        },
    ]
    const rows = [
        { id: 1, nombre: 'Snow', curp: 'Jon' },
        { id: 2, nombre: 'Lannister', curp: 'Cersei' },
        { id: 3, nombre: 'Lannister', curp: 'Jaime', age: 31 },
        { id: 4, nombre: 'Stark', curp: 'Arya', age: 11 },
        { id: 5, nombre: 'Targaryen', curp: 'Daenerys', age: null },
        { id: 6, nombre: 'Melisandre', curp: null, age: 150 },
        { id: 7, nombre: 'Clifford', curp: 'Ferrara', age: 44 },
        { id: 8, nombre: 'Frances', curp: 'Rossini', age: 36 },
        { id: 9, nombre: 'Roxie', curp: 'Harvey', age: 65 },
    ];

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => {
        setOpenModal(true)

    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const initialValues = {
        curp: "",
        name: "",
        address: "",
        birthDate: "",
        educationLevel: "",
        skills: [""],
        photo: null,
    };
    const onSubmit =()=>{

    }
    const validationSchema = Yup.object().shape({
        curp: Yup.string()
          .matches(/^[A-Z0-9]{18}$/, "CURP inválido, debe tener 18 caracteres")
          .required("CURP es obligatorio"),
        name: Yup.string()
          .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras")
          .min(2, "Mínimo 2 caracteres")
          .max(50, "Máximo 50 caracteres")
          .required("Nombre es obligatorio"),
        address: Yup.string().required("La dirección es obligatoria"),
        birthDate: Yup.date()
          .required("Fecha de nacimiento es obligatoria")
          .test(
            "is-adult",
            "Debes ser mayor de 18 años",
            (value) => new Date().getFullYear() - new Date(value).getFullYear() >= 18
          ),
        educationLevel: Yup.string()
          .oneOf(levelsOfEducation, "Selecciona un nivel válido")
          .required("Nivel de escolaridad es obligatorio"),
        skills: Yup.array()
          .of(Yup.string().required("La habilidad no puede estar vacía"))
          .min(1, "Debes agregar al menos una habilidad"),
        photo: Yup.mixed()
          .required("La fotografía es obligatoria")
          .test(
            "file-format",
            "Solo se permiten archivos JPEG o PNG",
            (value) =>
              value && ["image/jpeg", "image/png"].includes(value.type)
          ),
      });
    const modalComponent = () => {
        return (
            <div>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-description" >
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    onSubmit(values);
                                    handleCloseModal();
                                }}
                            >
                                {({ values, setFieldValue, errors, touched }) => (
                                    <Form>
                                            {/* CURP */}
                                            <Field
                                                name="curp"
                                                as={TextField}
                                                label="CURP"
                                                fullWidth
                                                margin="normal"
                                                error={touched.curp && Boolean(errors.curp)}
                                                helperText={touched.curp && errors.curp}
                                            />

                                            {/* Nombre */}
                                            <Field
                                                name="name"
                                                as={TextField}
                                                label="Nombre y Apellidos"
                                                fullWidth
                                                margin="normal"
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name && errors.name}
                                            />

                                            {/* Dirección */}
                                            <Field
                                                name="address"
                                                as={TextField}
                                                label="Dirección"
                                                fullWidth
                                                margin="normal"
                                                error={touched.address && Boolean(errors.address)}
                                                helperText={touched.address && errors.address}
                                            />

                                            {/* Fecha de Nacimiento */}
                                            <Field
                                                name="birthDate"
                                                as={TextField}
                                                label="Fecha de Nacimiento"
                                                fullWidth
                                                margin="normal"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                error={touched.birthDate && Boolean(errors.birthDate)}
                                                helperText={touched.birthDate && errors.birthDate}
                                            />

                                            {/* Nivel de Escolaridad */}
                                            <Field
                                                name="educationLevel"
                                                as={TextField}
                                                label="Nivel de Escolaridad"
                                                select
                                                fullWidth
                                                margin="normal"
                                                error={touched.educationLevel && Boolean(errors.educationLevel)}
                                                helperText={touched.educationLevel && errors.educationLevel}
                                            >
                                                {levelsOfEducation.map((level) => (
                                                    <MenuItem key={level} value={level}>
                                                        {level}
                                                    </MenuItem>
                                                ))}
                                            </Field>

                                            {/* Habilidades */}
                                            <FieldArray name="skills">
                                                {({ push, remove }) => (
                                                    <>
                                                        <Typography variant="h6">Habilidades</Typography>
                                                        {values.skills.map((skill, index) => (
                                                            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                                                <Field
                                                                    name={`skills[${index}]`}
                                                                    as={TextField}
                                                                    label={`Habilidad ${index + 1}`}
                                                                    fullWidth
                                                                    margin="normal"
                                                                    error={touched.skills?.[index] && Boolean(errors.skills?.[index])}
                                                                    helperText={touched.skills?.[index] && errors.skills?.[index]}
                                                                />
                                                                <IconButton
                                                                    onClick={() => remove(index)}
                                                                    disabled={values.skills.length === 1}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </div>
                                                        ))}
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() => push("")}
                                                            startIcon={<AddIcon />}
                                                        >
                                                            Agregar Habilidad
                                                        </Button>
                                                    </>
                                                )}
                                            </FieldArray>

                                            {/* Fotografía */}
                                            <Typography variant="h6" style={{ marginTop: "16px" }}>Fotografía</Typography>
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png"
                                                onChange={(event) =>
                                                    setFieldValue("photo", event.currentTarget.files[0])
                                                }
                                            />
                                            {errors.photo && touched.photo && (
                                                <Typography color="error">{errors.photo}</Typography>
                                            )}
                                    </Form>
                                )}
                            </Formik>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <center><strong>¿Desea continuar?</strong></center>
                        </Typography>
                        <br />
                        <div classNameName='row'>
                            <button className='btn btn-success' style={{ margin: '5%' }} >CONTINUAR</button>
                            <button className='btn btn-dark ' onClick={() => handleCloseModal()}>CANCELAR</button>
                        </div>
                    </Box>
                </Modal>
            </div>
        )
    }

    return (
        <div className='row' style={{ marginTop: '2%' }}>
            <Button variant="outlined" className='row' style={{ display: 'block' }} onClick={() => handleOpenModal()}>Agregar Usuario</Button>
            <Box sx={{ height: 400, width: '100%', marginTop: '2%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                //checkboxSelection
                //disableRowSelectionOnClick
                />
            </Box>
            {modalComponent()}
        </div>
    )
}
export default withRouter(UsuariosComponent);