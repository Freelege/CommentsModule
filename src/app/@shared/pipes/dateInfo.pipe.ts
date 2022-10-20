import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe( {
    name: 'dateInfo'
})
export class DateInfoPipe implements PipeTransform {
    transform(date: Date): string {
        let now = moment(new Date());
        let commentDate = moment(date);
        let duration = moment.duration(now.diff(commentDate));
        let months = Math.floor(duration.asMonths());

        if (months > 0) {
        return months == 1 ? "1 month ago" : months + " months ago";
        } else {
        let days = Math.floor(duration.asDays());
        if (days > 0) {
            return days == 1 ? "1 day ago" : days + " days ago";
        } else {
            let hours = Math.floor(duration.asHours());
            if (hours > 0) {
            return hours == 1 ? "1 hour ago": hours + " hours ago";
            } else {
            return commentDate.format('HH:mm:ss');
            }
        }
        }
    }
}