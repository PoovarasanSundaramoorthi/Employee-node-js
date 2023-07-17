const { AWS_REGION, AWS_KEY_ID, AWS_SECRET_KEY_ACCESS, AWS_BUCKET, SESSION_TOKEN, PORT, SENDGRID_API_KEY } =
  process.env;

// AWS Setting
// export const awsRegion = AWS_REGION || 'ap-south-1';
// export const awsAccessKeyId = 'AKIATQB4Q73RJJILVVOL';
// export const awsSecretAccessKey = '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';
// export const awsBucketName = 'bucket';
// export const TOKEN_KEY = SESSION_TOKEN;
export const sendGrid_Token = SENDGRID_API_KEY;
//port
export const port = PORT;
