import dayjs from 'dayjs'
import {createRequire} from 'module'
import Subcription from '../models/subscription.model.js'
import { sendReminderEmail } from '../utils/send-email.js'
const require=createRequire(import.meta.url)
const {serve}=require('@upstash/workflow/express')



// const REMINDERS = [0.1, 0.5, 1];
export const sendReminders=serve(async(context)=>{
    const {subscriptionId}=context.requestPayload;
    const subscription=await fetchSubscription(context,subscriptionId);
    if(!subscription|| subscription.status!== 'active') return;
    
    const renewalDate=dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal data has passed for subscription ${subscriptionId}.stopping workflow`)
        return;
    }
    for(const daysBefore of REMINDERS){
        const reminderDate=renewalDate.subtract(daysBefore,'day')
        // renewal date=22feb, reminder date=15feb,17,20,21
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context,`Reminder ${daysBefore} day before`,reminderDate);

        }
        await triggerReminder(context,`${daysBefore} days before reminder`,subscription);

    }
})
const fetchSubscription=async(context,subscriptionId)=>{
    return await context.run('get subscription',async()=>{
        return Subcription.findById(subscriptionId).populate('user','name email');
    })
}

const sleepUntilReminder= async(context,label,date)=>{
    console.log(`Sleeping until ${label} remainder at ${date}`);
    await context.sleepUntil(label,date.toDate());

}

const triggerReminder=async(context,label,subscription)=>{
    return await context.run(label,async()=>{
        console.log(`Triggering ${label} reminder`);
     
        await sendReminderEmail({
            to:subscription.user.email,
            type:label,
            subscription,
        })

    })
}