import { UserData } from "../../types";

/*
# Twitter api
## user object is like...
```
{
  "id": "2244994945",
  "name": "Twitter Dev",
  "username": "TwitterDev"
},
```
*/

export type UserDetail = {
  user: UserData;
  name: string;
  currentMentalValue: number;
};
