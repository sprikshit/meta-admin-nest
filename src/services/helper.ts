import * as dayjs from 'dayjs';

export class HelperService {
    getFormattedDateTimeString(date) {
        const now = date;
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(4, '0');

        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
        return formattedDateTime;
    }

    getStartDateByTimeRange(timeRange: string) {
        let startDate: any = ''; // Keep return startDate as a Date type
        console.log(timeRange);
        try {
            switch (timeRange) {
                case 'lastHour':
                    return (startDate = this.getFormattedDateTimeString(
                        dayjs().subtract(1, 'hour').toDate(),
                    ));
                    //   console.log(return startDate);
                    break;
                case 'last24Hours':
                    return (startDate = this.getFormattedDateTimeString(
                        dayjs().subtract(24, 'hours').toDate(),
                    ));
                    //   console.log(return startDate);

                    break;
                case 'yesterday':
                    return (startDate = this.getFormattedDateTimeString(
                        dayjs().subtract(1, 'day').startOf('day').toDate(),
                    ));
                    //   console.log(return startDate);
                    break;
                case 'thisWeek':
                    return (startDate = this.getFormattedDateTimeString(
                        dayjs().startOf('week').toDate(),
                    ));
                    break;
                case 'lastWeek':
                    return (startDate = this.getFormattedDateTimeString(
                        dayjs().subtract(1, 'week').startOf('week').toDate(),
                    ));
                    //   console.log(return startDate);
                    break;
                case 'thisMonth':
                    return (startDate = this.getFormattedDateTimeString(
                        dayjs().startOf('month').toDate(),
                    ));
                    break;
                case 'lastMonth':
                    return (startDate = this.getFormattedDateTimeString(
                        dayjs().subtract(1, 'month').startOf('month').toDate(),
                    ));
                    break;
                default:
                    throw new Error('Invalid time range');
            }
        } catch (error) {
            console.log('Error', error);
        }
    }
}
  //Count for Pro-Power-Global
  // async countProPowerGlobal(timeRange: any) {
  //   try {
  //     const timeModifier = new HelperService();
  //     let startDate: any = ''; 

  //     // Determine the start date based on the time range
  //     switch (timeRange) {
  //       case 'lastHour':
  //         startDate = timeModifier.getFormattedDateTimeString(
  //           dayjs().subtract(1, 'hour').toDate(),
  //         );
  //         console.log(startDate);
  //         break;
  //       case 'last24Hours':
  //         startDate = timeModifier.getFormattedDateTimeString(
  //           dayjs().subtract(24, 'hours').toDate(),
  //         );
  //         console.log(startDate);

  //         break;
  //       case 'yesterday':
  //         startDate = timeModifier.getFormattedDateTimeString(
  //           dayjs().subtract(1, 'day').startOf('day').toDate(),
  //         );
  //         console.log(startDate);
  //         break;
  //       case 'thisWeek':
  //         startDate = timeModifier.getFormattedDateTimeString(
  //           dayjs().startOf('week').toDate(),
  //         );
  //         break;
  //       case 'lastWeek':
  //         startDate = timeModifier.getFormattedDateTimeString(
  //           dayjs().subtract(1, 'week').startOf('week').toDate(),
  //         );
  //         console.log(startDate);
  //         break;
  //       case 'thisMonth':
  //         startDate = timeModifier.getFormattedDateTimeString(
  //           dayjs().startOf('month').toDate(),
  //         );
  //         break;
  //       case 'lastMonth':
  //         startDate = timeModifier.getFormattedDateTimeString(
  //           dayjs().subtract(1, 'month').startOf('month').toDate(),
  //         );
  //         break;
  //       default:
  //         throw new Error('Invalid time range');
  //     }

  //     console.log(`Start Date for ${timeRange}:`, startDate);
  //     const count =
  //       await this.pkgsModel.aggregate([
  //         {
  //           $match:{
  //             pkgType:'pro-power-global',
  //             createdAt: { $gte: startDate }
  //           }
  //         },{
  //           $count:'count'
  //         }
  //       ]);
  //     console.log(`Count of pro-power-global documents from ${startDate}:`,count,);
  //     return count[0].count;
  //   } catch (error) {
  //     console.error('Error counting pro-power-global documents:', error);
  //     throw error;
  //   }
  // }



//   async getUsersCountByTimePeriod(period: string): Promise < number > {
//     let filter: any = {};
//     const now = new Date();
//     let filterDate=''
//     const timeModifier = new HelperService();
//     switch(period) {
//       case 'lastHour':
//     const oneHourAgo = timeModifier.getFormattedDateTimeString(
//         new Date(now.getTime() - 1000 * 60 * 60)
//     );

//     filter = { createdAt: { $gte: oneHourAgo } };
//     filterDate = oneHourAgo
//         console.log(oneHourAgo)
//         break;

//     case 'last24Hours':
//     const twentyFourHoursAgo = timeModifier.getFormattedDateTimeString(
//         new Date(now.getTime() - 1000 * 60 * 60 * 24)
//     );
//     filter = { createdAt: { $gte: twentyFourHoursAgo } };
//     filterDate=twentyFourHoursAgo
//         console.log(twentyFourHoursAgo)
//         break;

//     case 'yesterday':
//     const today = timeModifier.getFormattedDateTimeString(
//         startOfDay(now)
//     );
//     const yesterdayStart = timeModifier.getFormattedDateTimeString(
//         subDays(now, 1)
//     );
//     filter = { createdAt: { $gte: yesterdayStart, $lt: today } };
//     break;

//     case 'thisWeek':
//     const thisWeekStart = timeModifier.getFormattedDateTimeString(
//         startOfWeek(now)
//     );
//     filter = { createdAt: { $gte: thisWeekStart } };
//     break;

//     case 'lastWeek':
//     const lastWeekStart = timeModifier.getFormattedDateTimeString(
//         startOfWeek(subWeeks(now, 1))
//     );
//     const lastWeekEnd = timeModifier.getFormattedDateTimeString(
//         startOfWeek(now)
//     );
//     filter = { createdAt: { $gte: lastWeekStart, $lt: lastWeekEnd } };
//     break;

//     case 'thisMonth':
//     const thisMonthStart = timeModifier.getFormattedDateTimeString(
//         startOfMonth(now)
//     );
//     filter = { createdAt: { $gte: thisMonthStart } };
//     break;

//     case 'lastMonth':
//     const lastMonthStart = timeModifier.getFormattedDateTimeString(
//         startOfMonth(subMonths(now, 1))
//     );
//     const lastMonthEnd = timeModifier.getFormattedDateTimeString(
//         startOfMonth(now)
//     );
//     filter = { createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd } };
//     break;

//     default:
//         throw new Error('Invalid period specified');
// }

// console.log('Applied filter:', filter);
// let count = await this.userModel.aggregate([
//     {
//         $match: {
//             createdAt: { $gt: filterDate }
//         }
//     },

//     {
//         $count: 'count'
//     }
// ])
// console.log(filterDate)
// console.log(count)
// return count[0].count;
//   }