import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class GlobalMessage {
    public Show_error(error: string) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            //footer: '<a href="">Why do I have this issue?</a>',
        });
    }

    public Show_message(message: string) {
        Swal.fire({
            icon: 'info',
            title: 'Message',
            text: message,
            //footer: '<a href="">Why do I have this issue?</a>',
        });
    }

  public Show_successmessage(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Message',
      text: message,
      //footer: '<a href="">Why do I have this issue?</a>',
    });
  }

    public Show_message_html(message: string) {
        Swal.fire({
            icon: 'info',
            title: 'Message',
            html: message,
            //footer: '<a href="">Why do I have this issue?</a>',
        });
    }

    public Show_confirm(message: string) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
}
