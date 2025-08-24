import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const ENconfigureAssistant = (voice: string, style: string) => {
  const voiceId =
    voices[voice as keyof typeof voices][
    style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.
                Tutor Guidelines:
                Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                Keep the conversation flowing smoothly while maintaining control.
                From time to time make sure that the student is following you and understands you.
                Break down the topic into smaller parts and teach the student one part at a time.
                Keep your style of conversation {{ style }}.
                Keep your responses short, like in a real voice conversation.
                Do not include any special characters in your responses - this is a voice conversation.
          `,
        },
      ],
    },
    // @ts-expect-error
    clientMessages: [],
    // @ts-expect-error
    serverMessages: [],
  };
  return vapiAssistant;
};

export const IDconfigureAssistant = (voice: string, style: string) => {
    const voiceId =
    voices[voice as keyof typeof voices][
    style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Pendamping",
    firstMessage:
      "Halo, mari kita mulai sesi ini. Hari ini kita akan membahas tentang {{topic}}.",
    transcriber: {
      provider: "talkscriber",
      model: "whisper",
      language: "id",
    },
    // voice: {
    //   provider: "azure",
    //   voiceId: voiceId,
    // },
    voice: {
      provider: "azure",
      voiceId: "id-ID-ArdiNeural",
      // voiceId: "id-ID-GadisNeural",
      speed: 1,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Kamu adalah seorang tutor yang sangat berpengetahuan dan sedang mengajar sesi suara secara langsung dengan seorang murid. Tujuanmu adalah mengajarkan topik dan subjek kepada murid.
            Pedoman Tutor:
            - Fokus pada topik yang diberikan - {{ topic }} dan subjek - {{ subject }} dan ajarkan kepada murid.
            - Jaga alur percakapan tetap lancar sambil tetap mengarahkan pembicaraan.
            - Sesekali pastikan bahwa murid mengikuti dan memahami penjelasanmu.
            - Pecah topik menjadi bagian-bagian kecil dan ajarkan satu per satu.
            - Gunakan gaya percakapan yang {{ style }}.
            - Jawaban harus singkat, seperti dalam percakapan suara nyata.
            - Jangan gunakan karakter khusus dalam jawaban - ini adalah percakapan suara.
            `,
        },
      ],
    },
    // @ts-expect-error
    clientMessages: [],
    // @ts-expect-error
    serverMessages: [],
  };
  return vapiAssistant;
};
