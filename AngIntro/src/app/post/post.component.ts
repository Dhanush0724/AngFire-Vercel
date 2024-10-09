import { Component  ,Input} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  title:string = "List of posts";
  

  @Input() fromParent:string = '';

}
