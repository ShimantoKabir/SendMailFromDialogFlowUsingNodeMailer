# SendMailFromDialogFlowUsingNodeMailer
A email sending agent that can send email for you

Step 1:
go here https://myaccount.google.com/lesssecureapps and enable for less secure apps. If this does not work then
Step 2
go here https://accounts.google.com/DisplayUnlockCaptcha and enable/continue and then try.
for me step 1 alone didn't work so i had to go to step 2.
i also tried removing the nodemailer-smtp-transport package and to my surprise it works. but then when i restarted my system it gave me same error, so i had to go and turn on the less secure app (i disabled it after my work).
then for fun i just tried it with off(less secure app) and vola it worked again!
