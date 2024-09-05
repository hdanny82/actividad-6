import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  usersServices = inject (UsersService)
  activatedRoute = inject (ActivatedRoute)
  router = inject (Router)

  inputForm : FormGroup
  error : boolean = false
  currentUser !: IUser
  user !: any

  constructor () {

    
    this.inputForm = new FormGroup ({
      first_name: new FormControl (null,[
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl (null,[
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl (null,[
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)   /* validación del patrón de email */
      ]),
      image: new FormControl (null,[
        Validators.required,
      ]),
    },[])
  }
  

  // Llenado del formulario para edición
  ngOnInit () {
    this.activatedRoute.params.subscribe((params:any) =>{
      const currentId = params.url
      if (currentId) {
        this.usersServices.getById(currentId).subscribe((response:any) => {
          if (response.error !== undefined) {
            this.error = true
          } else {
            this.error = false
            // instancio el formulario con los datos del usuario
            this.inputForm = new FormGroup ({
              _id: new FormControl (response._id,[]),
              id: new FormControl (response.id,[]),
              first_name: new FormControl (response.first_name,[
                Validators.required,
                Validators.minLength(3)
              ]),
              last_name: new FormControl (response.last_name,[
                Validators.required,
                Validators.minLength(2)
              ]),
              username: new FormControl (response.id,[]),
              email: new FormControl (response.email,[
                Validators.required,
                Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/)   /* validación del patrón de email modificada a 6 caracteres tras el punto para admitir el formato @peticiones.online*/
              ]),
              image: new FormControl (response.image,[
                Validators.required,
              ]),
              password: new FormControl (response._id,[]),
            },[])
          }
        })
      }
    })
  }


  // recogemos el input del formulario para realizar el insert en el servicio
  getDataForm () {
    // console.log (this.inputForm.value)
    if (this.inputForm.value._id) {   /* Formulario de actualización */
      this.usersServices.updateUser(this.inputForm.value).subscribe ((response:any) =>{
        if (response.id) {
          console.log (response)
          alert (`El usuario se ha modificado correctamente`)
          // Tras la edición redirecciono a /home
          this.router.navigate(['/home'])
        } else {
          alert ("Ha habido un problema! \nNo se ha creado el nuevo usuario")
        }
      })

    } else {   /* formulario de nuevo usuario */
      // Creo automaticamente el username como first_name.last_name eliminando espacios y en minúsculas
      let username = (this.inputForm.value.first_name + "." + this.inputForm.value.last_name).replace(/\s/g,'').toLowerCase()
  
      // recibo el input del form y añado el username creado automaticamente
      this.user = this.inputForm.value
      this.user ['username'] = username
  
      this.usersServices.createNewUser(this.user).subscribe ((response:any) =>{
        if (response.id) {
          alert (`El usuario ${response.first_name} ${response.last_name} se ha añadido correctamente`)
          // Tras la inserción redirecciono a /home
          this.router.navigate(['/home'])
        } else {
          alert ("Ha habido un problema! \nNo se ha creado el nuevo usuario")
        }
      })
    }
  }


  // Función para la validación de los elementos del formulario

  checkControl (formControlName : string, validator:string) : boolean | undefined {
    return this.inputForm.get(formControlName)?.hasError(validator) && (this.inputForm.get(formControlName)?.touched)
  }


}


