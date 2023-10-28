import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MicroMaterial } from './model/micromaterial.interface';
import { loadMicromaterials } from './bl/micromateriallist';
import { VSCodeCommunicationService } from 'src/app/services/vscode-communication.service';

@Component({
  selector: 'app-micromaterial-list',
  templateUrl: './micromaterial-list.component.html',
  styleUrls: ['./micromaterial-list.component.scss']
})
export class MicromaterialListComponent implements OnInit {
  materials: MicroMaterial[] = [];

  constructor(private vsCodeComm: VSCodeCommunicationService) {}
  
  ngOnInit(): void {
    this.materials = [
      {
        name: 'Your micromaterial here?',
        description: 'Have you built a micromaterial that you feel can be benificial for the community of learners? Have you encountered an amazing micromaterial online? Contact us via Github or create a pull request to have that micromaterial included in this list so it can be discovered by learners worldwide.',
        url: 'https://github.com/yoshimalaise/Explorotron',
        tags: []
      },
      ...loadMicromaterials().sort((a, b) => (a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase()) ? -1 : (a.name.toLocaleUpperCase() > b.name.toLocaleUpperCase()) ? 1 : 0)
    ];
  }

  openWebpage(url: string) {
    this.vsCodeComm.sendMessage('openWebpage', { url });
  }

}
