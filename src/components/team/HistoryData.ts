export interface IHistoryItem {
    month: string;
    desc: string;
    imageUrl?: string;
    dot?: boolean;
    reverse?: boolean;
}
export interface IHistory {
    year: string;
    items: IHistoryItem[];
}
const HistoryData: IHistory[] = [
    {
        year: "2021",
        items: [
            {
                month: "August",
                desc: "CloudMile has been awarded the Managed Services Provider__",
            },
            {
                month: "July",
                desc: "CloudMile won the 2020 Google Cloud Public Sector Partner of the Year award in APAC",
                reverse: true,
            },
            {
                month: "June",
                desc: "Recieved the fourth Google Cloud Partner Specialization",
            },
        ],
    },
    {
        year: "2020",
        items: [
            {
                month: "December",
                desc: "Raised US$ 10 Million in series B funding to accelerate market expansion in Malaysia",
                imageUrl: "",
                reverse: true,
            },
            {
                month: "November",
                desc: "CEO Spencer Liu was elected as the fifth director of__",
                imageUrl: "/team/img-consultant.jpg",
                reverse: true,
            },
            {
                month: "October",
                desc: "Selected as top 10 Taiwan startup companies that__",
                dot: true,
            },
            {
                month: "August",
                desc: "Former Minister of Science and Technology of Taiwan__",
                reverse: true,
            },
            {
                month: "May",
                desc: "Hong Kong office expansion",
            },
            {
                month: "April",
                desc: "Chairman of DTA Chen Jen-ran officially joined as the company’s advisor",
                reverse: true,
            },
        ],
    },
    {
        year: "2019",
        items: [
            {
                month: "November",
                desc: "Raised US$6 million in a pre-series B round",
                reverse: true,
            },
        ],
    },
    {
        year: "2018",
        items: [
            {
                month: "October",
                desc: "Raised another A-Round Funding__",
            },
            {
                month: "September",
                desc: "Recognized with Google Cloud Machine__",
                reverse: true,
                dot: true,
            },
            {
                month: "June",
                desc: "Partnered with Google Maps Platform__",
                reverse: true,
                imageUrl: "/team/cloudmile2019.jpg",
                dot: true,
            },
            {
                month: "April",
                desc: "Recognized with Google Cloud Infrastructure__",
                reverse: true,
            },
            {
                month: "March",
                desc: "Selected as the “Coolest 10 Startups”",
            },
        ],
    },
    {
        year: "2017",
        items: [
            {
                month: "December",
                desc: "Established SG office",
                reverse: true,
                imageUrl: "/team/google-cloud.jpg",
            },
            {
                month: "August",
                desc: "Established HK office",
                imageUrl: "/team/established-sg-office.jpg",
            },
            {
                month: "April",
                desc: "Series A Fundraising with__",
                reverse: true,
            },
            {
                month: "January",
                desc: "Established CloudMile in Taiwan",
            },
        ],
    },
    {
        year: "2016",
        items: [
            {
                month: "December",
                desc: "Preparatory Work",
                imageUrl: "/team/ai4biz.jpg",
                reverse: true,
            },
        ],
    },
];
export default HistoryData;
