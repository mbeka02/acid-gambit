import { WorkoutOfTheDay } from './wod';
import { getSession, getSubscription } from '@/app/supabase-server';
import { DashboardHeader } from '@/components/header';
import { Database } from '@/types_db';
import { getDate } from '@/utils/helpers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

type Workout = Database['public']['Tables']['wods']['Row'];

export default async function Wod() {
  const supabase = createServerComponentClient({
    cookies
  });

  const today = new Date(); // use to query for workout for today's date
  const date = await getDate(); // use as title for card
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const { data: wod } = await supabase
    .from('wods')
    .select('*')
    .eq('date', formattedDate)
    .single();

  return (
    <div>
      <div className="pb-2">
        <DashboardHeader heading="Workout of the Day" text="Start Training" />
      </div>
      <WorkoutOfTheDay date={date} workoutData={wod} />
    </div>
  );
}
