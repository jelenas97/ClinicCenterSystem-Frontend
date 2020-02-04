import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {Clinic} from '../../model/clinic';
import {ShowMyClinicService} from './show-my-clinic.service';
import {GoogleMapsAPIWrapper, MapsAPILoader, AgmMap} from '@agm/core';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-show-my-clinic',
  templateUrl: './show-my-clinic.component.html',
  styleUrls: ['./show-my-clinic.component.css']
})
export class ShowMyClinicComponent implements OnInit {

  user: User;
  clinic: Clinic;
  geocoder: any;
  public location: Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };


  // @ts-ignore
  @ViewChild(AgmMap) map: AgmMap;

  constructor(private showMyClinicService: ShowMyClinicService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private userService: UserService,
              public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper) {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {

    this.showMyClinicService.getClinic(this.user.id).subscribe(data => {
      this.clinic = data;
      console.log(this.clinic);
      if (!this.geocoder) {
        this.geocoder = new google.maps.Geocoder();
      }
      this.geocoder.geocode({
        address: this.clinic.address + ' ' + this.clinic.city
      }, (results, status) => {
        console.log(this.location);
        console.log(results);
        if (status === google.maps.GeocoderStatus.OK) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < results[0].address_components.length; i++) {
            const types = results[0].address_components[i].types;

            if (types.indexOf('locality') !== -1) {
              this.location.address_level_2 = results[0].address_components[i].long_name;
            }
            if (types.indexOf('country') !== -1) {
              this.location.address_country = results[0].address_components[i].long_name;
            }
            if (types.indexOf('postal_code') !== -1) {
              this.location.address_zip = results[0].address_components[i].long_name;
            }
            if (types.indexOf('administrative_area_level_1') !== -1) {
              this.location.address_state = results[0].address_components[i].long_name;
            }
          }

          if (results[0].geometry.location) {
            this.location.lat = results[0].geometry.location.lat();
            this.location.lng = results[0].geometry.location.lng();
            this.location.marker.lat = results[0].geometry.location.lat();
            this.location.marker.lng = results[0].geometry.location.lng();
            this.location.marker.draggable = true;
            this.location.viewport = results[0].geometry.viewport;
          }

          this.map.triggerResize();
        } else {
          alert('Sorry, there is no location with this address.');
        }
      });
    });
  }

}
