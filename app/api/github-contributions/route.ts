import { NextResponse } from 'next/server';

function mapContributionLevel(level: string): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case 'NONE': return 0;
    case 'FIRST_QUARTILE': return 1;
    case 'SECOND_QUARTILE': return 2;
    case 'THIRD_QUARTILE': return 3;
    case 'FOURTH_QUARTILE': return 4;
    default: return 0;
  }
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_PAT;

  if (!username || !token) {
    return NextResponse.json(
      { error: 'GitHub username atau token belum dikonfigurasi di server.' },
      { status: 500 }
    );
  }

  const GITHUB_GRAPHQL_QUERY = `
    query GetUserContributions($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday 
                contributionLevel
                # color // Anda juga bisa mengambil warna langsung dari GitHub jika mau
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: { username },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error Response:', errorText);
      return NextResponse.json(
        { error: `GitHub API merespons dengan status ${response.status}. Detail: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GitHub GraphQL Errors:', data.errors);
      return NextResponse.json(
        { error: 'Gagal mengambil data dari GitHub GraphQL.', details: data.errors },
        { status: 500 }
      );
    }
    
    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
         return NextResponse.json({ error: 'Data kalender kontribusi tidak ditemukan.' }, { status: 404 });
    }

    const activities = calendar.weeks.flatMap((week: any) =>
      week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level: mapContributionLevel(day.contributionLevel),
      }))
    );
    
    return NextResponse.json({
        totalContributions: calendar.totalContributions,
        activities
    });

  } catch (error: any) {
    console.error('Kesalahan saat mengambil kontribusi GitHub:', error);
    return NextResponse.json(
        { error: 'Gagal mengambil kontribusi GitHub.', details: error.message },
        { status: 500 }
    );
  }
}