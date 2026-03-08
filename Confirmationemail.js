export const confirmationEmail = (cleanName, cleanMessage) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Got your message!</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 16px;">
        <tr>
            <td align="center">
                <table width="100%" style="max-width:540px;" cellpadding="0" cellspacing="0">

                    <!-- ── HEADER ── -->
                    <tr>
                        <td style="
                            background: linear-gradient(135deg, #0f0f0f 0%, #1a0a2e 100%);
                            border-radius: 16px 16px 0 0;
                            padding: 40px 40px 32px;
                            text-align: center;
                            border: 1px solid rgba(123,47,190,0.3);
                            border-bottom: none;
                        ">
                            <!-- logo -->
                            <div style="margin-bottom:24px;">
                                <span style="font-size:28px;font-weight:900;letter-spacing:0.05em;color:#ffffff;">
                                    <span style="color:#A855F7;">V</span>IREN.
                                </span>
                            </div>

                            <!-- badge -->
                            <div style="
                                display:inline-block;
                                background:rgba(168,85,247,0.12);
                                border:1px solid rgba(168,85,247,0.35);
                                border-radius:999px;
                                padding:6px 18px;
                                margin-bottom:20px;
                            ">
                                <span style="font-size:11px;color:#A855F7;letter-spacing:0.2em;text-transform:uppercase;">
                                    // message received
                                </span>
                            </div>

                            <!-- heading -->
                            <h1 style="margin:0;font-size:32px;font-weight:900;color:#ffffff;letter-spacing:0.02em;line-height:1.1;">
                                GOT YOUR<br/>
                                <span style="background:linear-gradient(135deg,#7B2FBE,#A855F7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
                                    MESSAGE!
                                </span>
                            </h1>
                        </td>
                    </tr>

                    <!-- ── BODY ── -->
                    <tr>
                        <td style="
                            background:#0f0f0f;
                            padding:36px 40px;
                            border:1px solid rgba(123,47,190,0.2);
                            border-top:none;
                            border-bottom:none;
                        ">
                            <!-- greeting -->
                            <p style="margin:0 0 16px;font-size:16px;color:#e5e5e5;line-height:1.6;">
                                Hey <strong style="color:#ffffff;">${cleanName}</strong>,
                            </p>

                            <!-- main text -->
                            <p style="margin:0 0 28px;font-size:15px;color:#a3a3a3;line-height:1.7;">
                                Thanks for reaching out — really means a lot! I go through every
                                message personally and will get back to you within
                                <strong style="color:#A855F7;">24 hours</strong>.
                                If it's urgent, feel free to reply directly to this email.
                            </p>

                            <!-- gradient divider -->
                            <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(123,47,190,0.4),transparent);margin-bottom:28px;"></div>

                            <!-- your message label -->
                            <p style="margin:0 0 12px;font-size:10px;color:#6b7280;letter-spacing:0.2em;text-transform:uppercase;">
                                // your message
                            </p>

                            <!-- message box -->
                            <div style="
                                background:rgba(123,47,190,0.06);
                                border:1px solid rgba(123,47,190,0.2);
                                border-left:3px solid #7B2FBE;
                                border-radius:8px;
                                padding:20px;
                                margin-bottom:32px;
                            ">
                                <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.75;font-style:italic;">
                                    ${cleanMessage.replace(/\n/g, '<br/>')}
                                </p>
                            </div>

                            <!-- gradient divider -->
                            <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(123,47,190,0.4),transparent);margin-bottom:28px;"></div>

                            <!-- sign off -->
                            <p style="margin:0 0 4px;font-size:14px;color:#a3a3a3;">Talk soon,</p>
                            <p style="margin:0;font-size:16px;font-weight:700;color:#ffffff;">Viren Kevat</p>
                            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;letter-spacing:0.05em;">
                                Full Stack Developer · Final Year IT @ GEC Modasa
                            </p>
                        </td>
                    </tr>

                    <!-- ── SOCIALS ── -->
                    <tr>
                        <td style="
                            background:#0a0a0a;
                            padding:24px 40px;
                            text-align:center;
                            border:1px solid rgba(123,47,190,0.2);
                            border-top:1px solid rgba(123,47,190,0.15);
                            border-bottom:none;
                        ">
                            <p style="margin:0 0 16px;font-size:10px;color:#6b7280;letter-spacing:0.2em;text-transform:uppercase;">
                                // find me on
                            </p>
                            <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                                <tr>
                                    <td style="padding:0 6px;">
                                        <a href="https://github.com/Viren-Kevat" style="
                                            display:inline-block;
                                            background:rgba(255,255,255,0.05);
                                            border:1px solid rgba(255,255,255,0.1);
                                            border-radius:8px;
                                            padding:8px 16px;
                                            font-size:12px;
                                            color:#a3a3a3;
                                            text-decoration:none;
                                            letter-spacing:0.05em;
                                        ">GitHub</a>
                                    </td>
                                    <td style="padding:0 6px;">
                                        <a href="https://www.linkedin.com/in/viren-kevat" style="
                                            display:inline-block;
                                            background:rgba(255,255,255,0.05);
                                            border:1px solid rgba(255,255,255,0.1);
                                            border-radius:8px;
                                            padding:8px 16px;
                                            font-size:12px;
                                            color:#a3a3a3;
                                            text-decoration:none;
                                            letter-spacing:0.05em;
                                        ">LinkedIn</a>
                                    </td>
                                    <td style="padding:0 6px;">
                                        <a href="mailto:viren0210@gmail.com" style="
                                            display:inline-block;
                                            background:rgba(123,47,190,0.15);
                                            border:1px solid rgba(123,47,190,0.35);
                                            border-radius:8px;
                                            padding:8px 16px;
                                            font-size:12px;
                                            color:#A855F7;
                                            text-decoration:none;
                                            letter-spacing:0.05em;
                                        ">Email</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ── FOOTER ── -->
                    <tr>
                        <td style="
                            background:#080808;
                            border-radius:0 0 16px 16px;
                            padding:20px 40px;
                            text-align:center;
                            border:1px solid rgba(123,47,190,0.2);
                            border-top:1px solid rgba(255,255,255,0.05);
                        ">
                            <p style="margin:0;font-size:11px;color:#4b5563;letter-spacing:0.08em;">
                                This is an automated confirmation from your portfolio contact form
                            </p>
                            <p style="margin:6px 0 0;font-size:11px;color:#4b5563;">
                                <a href="https://virenkevat.com" style="color:#7B2FBE;text-decoration:none;">
                                    virenkevat.com
                                </a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
`