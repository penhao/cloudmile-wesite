export interface IOffice {
    office: string;
    address: string;
    addressLink: string;
    tel: string;
    serviceEmail: string;
    hrEmail: string;
}
const Offices = <IOffice[]>[
    {
        office: "Singapore Office",
        address: "Singapore Address",
        addressLink: "https://goo.gl/maps/cVtUySaEkhhhSrxa6",
        tel: "+65-6993-2383",
        serviceEmail: "service@mile.cloud",
        hrEmail: "hr@mile.cloud",
    },
    {
        office: "Hong Kong Office",
        address: "Hong Kong Address",
        addressLink: "https://goo.gl/maps/PeJau98wYihdbpx6A",
        tel: "+852-3481-0068",
        serviceEmail: "service@mile.cloud",
        hrEmail: "hr@mile.cloud",
    },
    {
        office: "Taipei Office",
        address: "Taiwan Address",
        addressLink: "https://goo.gl/maps/6x9FqXwzcR6dL43n9",
        tel: "+886-2-2757-6077",
        serviceEmail: "service@mile.cloud",
        hrEmail: "hr@mile.cloud",
    },
];
export default Offices;
