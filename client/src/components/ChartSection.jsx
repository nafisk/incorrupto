import { useState, useEffect } from 'react';
import BarGraph from './charts/BarGraph';
import PieChart from './charts/PieChart';
import DoughnutPie from './charts/DougnutPie';
import DelayBarChart from './charts/DelayBarChart';
import PolarChart from './charts/PolarChart';
import './chartSelection.css';

// Default test data
let datatest = [65, 59, 80, 81, 56, 55, 40, 30]; // change this to zero as default.
let datatestpi = [30, 70]; // set to zero
let datatestpi_ = [30, 70]; // set to zero
let fact_or_op_default = [0, 0]; // set to zero
let polartestData = [0, 0, 0];

const initialPolarChartData = {
  labels: ['Right-Wing', 'Left-Wing', 'Neutral'],
  datasets: [
    {
      label: 'Political Spectrum',
      data: polartestData, // Ensure this array has three elements, one for each category
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // Red for Right-Wing
        'rgba(54, 162, 235, 0.6)', // Blue for Left-Wing
        'rgba(201, 203, 207, 0.6)', // Gray for Neutral
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)', // Red border for Right-Wing
        'rgba(54, 162, 235, 1)', // Blue border for Left-Wing
        'rgba(201, 203, 207, 1)', // Gray border for Neutral
      ],
      borderWidth: 1,
      hoverOffset: 4,
    },
  ],
};

const optionsPolar = {
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Political Spectrum Distribution',
    },
  },
  scales: {
    y: {
      beginAtZero: true, // This setting applies to charts with axes
    },
  },
};

const initialPieChartData = {
  labels: ['NSFW', 'SFW'],
  datasets: [
    {
      label: 'Percentage',
      data: datatestpi, // Ensure this array has three elements, one for each category
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // Red for Right-Wing
        'rgba(54, 162, 235, 0.6)', // Blue for Left-Wing
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)', // Red border for Right-Wing
        'rgba(54, 162, 235, 1)', // Blue border for Left-Wing
      ],
      borderWidth: 1,
      hoverOffset: 4,
    },
  ],
};

const optionsPie = {
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'NSFW CONTENT',
    },
  },
  scales: {
    y: {
      beginAtZero: true, // This setting applies to charts with axes
    },
  },
};

const initialDoughnutChartData = {
  labels: ['Fact', 'Opinion'],
  datasets: [
    {
      label: 'Analysis',
      data: fact_or_op_default, // Ensure this is defined somewhere in your code
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)', // Green for Fact
        'rgba(255, 159, 64, 0.5)', // Orange for Opinion
      ],
      hoverOffset: 4,
    },
  ],
};

const initialDelayBarChartData = {
  labels: [
    'Toxicity',
    'Masculine',
    'Feminine',
    'Insult',
    'Mental Illness',
    'Obscene',
    'Sexually Explicit',
    'Severely Toxic',
  ],
  datasets: [
    {
      label: 'Sentiment Analysis',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)', // Red for Toxicity
        'rgba(54, 162, 235, 0.2)', // Blue for Masculine
        'rgba(255, 205, 86, 0.2)', // Yellow for Feminine
        'rgba(75, 192, 192, 0.2)', // Teal for Insult
        'rgba(153, 102, 255, 0.2)', // Purple for Mental Illness
        'rgba(255, 159, 64, 0.2)', // Orange for Obscene
        'rgba(201, 203, 207, 0.2)', // Light Grey for Sexually Explicit
        'rgba(233, 30, 99, 0.2)', // Pink for Severely Toxic
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)', // Red
        'rgba(54, 162, 235, 1)', // Blue
        'rgba(255, 205, 86, 1)', // Yellow
        'rgba(75, 192, 192, 1)', // Teal
        'rgba(153, 102, 255, 1)', // Purple
        'rgba(255, 159, 64, 1)', // Orange
        'rgba(201, 203, 207, 1)', // Light Grey
        'rgba(233, 30, 99, 1)', // Pink
      ],
      borderWidth: 1,
      data: datatest, // Ensure this array has eight elements, one for each category
    },
  ],
};

const optionsDoughNut = {
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Fact and Opinion Percentages',
    },
  },
  scales: {
    y: {
      beginAtZero: true, // This setting applies to charts with axes
    },
  },
};

const initialPieChartDataAI = {
  labels: ['AI-Generated', 'Human-Generated'],
  datasets: [
    {
      label: 'Percentage',
      data: datatestpi_, // Ensure this array has two elements, one for each category
      backgroundColor: [
        'rgba(153, 102, 255, 0.6)', // A soft purple for AI-Generated
        'rgba(255, 159, 64, 0.6)', // A soft orange for Human-Generated
      ],
      borderColor: [
        'rgba(153, 102, 255, 1)', // A solid purple for AI-Generated
        'rgba(255, 159, 64, 1)', // A solid orange for Human-Generated
      ],
      borderWidth: 1,
      hoverOffset: 4,
    },
  ],
};

const optionsPieAI = {
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'AI Detection',
    },
  },
  scales: {
    y: {
      beginAtZero: true, // This setting applies to charts with axes
    },
  },
};

// Progress Bar Component
const ProgressBar = ({ percentage }) => {
  // Determine the color based on the percentage
  const getColor = percentage => {
    if (percentage <= 25) return 'bg-green-500';
    if (percentage <= 50) return 'bg-yellow-500';
    if (percentage <= 75) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className='w-full h-6 bg-gray-200 rounded-full opacity-60'>
      <div
        className={`h-6 rounded-full ${getColor(percentage)}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

function ChartSection({ articleData }) {
  console.log(articleData);

  var x = {
    analytics_metrics: {
      'AI detector': [
        [
          {
            label: 'human-produced',
            score: 0.9995044469833374,
          },
          {
            label: 'machine-generated',
            score: 0.0004955240874551237,
          },
        ],
      ],
      fact_or_opinion: [
        [
          {
            label: 'LABEL_1',
            score: 0.9964272379875183,
          },
          {
            label: 'LABEL_0',
            score: 0.003572817426174879,
          },
        ],
      ],
      implicit_hate: [
        [
          {
            label: 'LABEL_0',
            score: 0.9993557333946228,
          },
          {
            label: 'LABEL_1',
            score: 0.0006442895974032581,
          },
        ],
      ],
      inappropriate_text_classifier: [
        [
          {
            label: 'NSFW',
            score: 0.6847699880599976,
          },
          {
            label: 'SFW',
            score: 0.31523004174232483,
          },
        ],
      ],
      politicalBiasBERT: [
        [
          {
            label: 'CENTER',
            score: 0.4958111345767975,
          },
          {
            label: 'LEFT',
            score: 0.33409377932548523,
          },
          {
            label: 'RIGHT',
            score: 0.17009510099887848,
          },
        ],
      ],
      toxicity: [
        [
          {
            label: 'toxicity',
            score: 0.0003561065823305398,
          },
          {
            label: 'male',
            score: 0.0002561890578363091,
          },
          {
            label: 'female',
            score: 0.00012439808051567525,
          },
          {
            label: 'psychiatric_or_mental_illness',
            score: 0.00012156588491052389,
          },
          {
            label: 'insult',
            score: 0.00010542564268689603,
          },
          {
            label: 'white',
            score: 8.778473420534283e-5,
          },
          {
            label: 'christian',
            score: 6.772303459001705e-5,
          },
          {
            label: 'muslim',
            score: 6.377747922670096e-5,
          },
          {
            label: 'black',
            score: 4.7926223487593234e-5,
          },
          {
            label: 'jewish',
            score: 3.563194695743732e-5,
          },
          {
            label: 'homosexual_gay_or_lesbian',
            score: 3.325587385916151e-5,
          },
          {
            label: 'identity_attack',
            score: 3.1496925657847896e-5,
          },
          {
            label: 'obscene',
            score: 2.992371992149856e-5,
          },
          {
            label: 'threat',
            score: 2.3920132662169635e-5,
          },
          {
            label: 'sexual_explicit',
            score: 1.8918724890681915e-5,
          },
          {
            label: 'severe_toxicity',
            score: 1.2605568144863355e-6,
          },
        ],
      ],
    },
    articleInfo: {
      PersonsOfInterest: [
        'Jerome Powell',
        'Jared Bernstein',
        'Joe Brusuelas',
        'Diane Swonk',
        'Jillian Hiscock',
        'Joe Biden',
      ],
      PlacesOfInterest: [
        'United States',
        'White House',
        'Bureau of Labor',
        'Federal Reserve',
        'Bureau of Economic',
        'Council of Economic',
        'RSM US',
        'KPMG',
        'Minneapolis',
        'Twin Cities',
        'A Bar of Their Own',
      ],
      author:
        'The author of the article is not mentioned in the provided text, so the requested data could not be extracted.',
      date: 'The date of publication of the article is February 2, 2024.',
      summary:
        '- The US economy added 353,000 jobs in January, exceeding expectations and pushing up Treasury yields.\n- The unemployment rate remained at 3.7%.\n- Markets surged, with the S&P 500 closing at a record high.\n- Tech stocks, including Meta Platforms, Amazon, Nvidia, and Microsoft, saw significant gains.\n- The equal-weighted S&P 500 and Russell 2000 index declined.\n- US worker productivity grew 3.2% in the fourth quarter, surpassing expectations.\n- Wage growth data showed a 4.5% annual hourly earnings growth, benefiting American households.\n- The leisure and hospitality industry added 11,000 jobs, while the service sector saw its 36th consecutive month of job gains.\n- President Biden highlighted the strong job market and economic achievements, but a CNN poll showed that 55% of Americans believe his policies have worsened economic conditions.',
      text: '- The US economy added a stunning 353,000 jobs last month, confounding market expectations Friday morning and pushing up Treasury yields.\n- The unemployment rate stayed at 3.7%.\n- Job gains sent markets surging, and the S&P 500 closed at a record high.\n- A new CNN poll shows the public’s long-held pessimism about the economy is easing — but a majority of Americans still think the US economy is in trouble.\n- While the latest jobs numbers underscore the strength of the US economy, it remains to be seen if the data could push back the timeline for interest rate cuts, which markets were hoping would start in March.\n- Fed Chair Jerome Powell poured cold water on that notion Wednesday, saying there would be no rate cut that month. Friday’s whopper of a jobs number certainly confirms that.\n- Tech stocks were the winners of Friday’s session, following strong earnings reports from Meta Platforms and Amazon the prior evening.\n- Meta Platforms shares jumped 20.3% to close at a record high of $474.99 after the company reported a surge in profit, its first-ever cash dividend and a $50 billion share buyback.\n- Amazon shares rose 7.9% after the e-commerce giant reported solid earnings for its latest quarter.\n- Other tech stocks also saw a boost. Shares of Nvidia popped roughly 5% to a record-high close of $661.57. Meta and Nvidia both also logged new all-time highs during the middle of the session.\n- Microsoft shares rose 1.8% to a fresh record-high close of $411.22.\n- Stocks’ gains weren’t even across the market. The equal-weighted S&P 500 index, which gives each stock the same influence over its performance, fell 0.8% on Friday.\n- The Russell 2000 index, which tracks the performance of US small-cap stocks, declined 0.5%.\n- US stocks rose on Friday as investors continued to parse strong tech earnings and a searing jobs report.\n- The Dow rose 135 points, or 0.4%. The S&P 500 gained 1.1% and closed at a record high. The Nasdaq Composite climbed 1.7%. All three major indexes ended the week higher.\n- The US economy added a staggering 353,000 jobs in January, blowing past economists’ expectations of 176,500 jobs last month, according to fresh data from the Bureau of Labor Statistics released Friday morning.\n- The hot job market is creating a positive feedback loop in the American economy, White House economist Jared Bernstein said Friday.\n- During a Zoom with reporters, Bernstein argued that the blow-out January jobs report “tells an unequivocal story of a very strong jobs market.”\n- Bernstein, chair of the White House Council of Economic Advisers, pointed to how unemployment has remained below 4% for the 24th month in a row.\n- The strength in the job market is powering a “virtuous cycle” in the economy, Bernstein said, noting that consumer spending makes up 70% of GDP.\n- The thinking is that as long as consumers have jobs, and paychecks are beating inflation, Americans can keep shopping. And that in turn should create new jobs, and so on.\n- Still, some economists worry the January jobs report paints a picture of a job market that is too hot — a concern that could prevent the Federal Reserve from cutting interest rates anytime soon. \n- Bernstein declined to weigh in on Fed policy, but said the White House is “always happy to see a very strong jobs market.”\n- “We’re particularly happy to see wages outpacing prices. That’s so important for families like the one the president grew up in,” he said.\n- The S&P 500 was higher Friday after white-hot tech earnings balanced out some negative sentiment from the blowout jobs report, which left investors mulling the Federal Reserve’s next move.\n- But the Dow Jones Transportation Average, which tracks 20 US transportation stocks from railroads to airlines to delivery, has fallen 1.6% this year through Thursday’s close, underperforming the broader Dow industrials’ 2.2% gain during that same period.\n- That’s a reversal from the transportation index’s nearly 6% gain in December, as optimism that the economy would see a soft landing, or a marked decline in inflation without spurring a recession, sparked a gangbusters “everything” rally across markets.\n- As that optimism dims, some investors worry that the decline in transportation stocks suggests rough times ahead for the economy. The transportation index tends to fall when the economy deteriorates, as demand for travel and goods wanes.\n- On Friday mid-afternoon, the Dow transports rose 1.2% as investors parsed the blockbuster January jobs report. But small-caps continued to slide. The Russell 2000 fell 0.9%.\n- US worker productivity grew 3.2% in the fourth quarter, surpassing expectations for a 2.1% gain, according to a Bureau of Labor Statistics report released Thursday.\n- That’s a key piece of data, since productivity growth can help reduce inflationary pressures.\n- More good news for American households came in the wage growth data released Friday as part of the jobs report. While the estimated 4.5% annual hourly earnings growth may trigger a dull headache for the Federal Reserve, it’s ultimately good for the American psyche, said Joe Brusuelas, chief economist and principal at RSM US.\n- “It’s about jobs, and it’s about what people make, and this data reflects the increase in productivity. Improved productivity leads to improved number of jobs, better pay and rising living standards. It’s that mythical tide that lifts all boats.”\n- Diane Swonk, chief economist of KPMG, told CNN this week that rising productivity could likely be attributed as a result of the interest rate hikes and the labor market getting back into better balance following the pandemic recovery.\n- “What we saw as rates went up is that finally workers that were in their jobs got to learn their jobs and get training that had been completely sidelined by the hiring frenzy,” she said. “That helped productivity growth, along with the fact that firms could finally take a breath and leverage the technologies that they so rapidly embraced online.”\n- Stocks rose Friday midday as investors continued to look through the latest jobs report.\n- The Dow rose 43 points, or 0.1%. The S&P 500 gained 0.9% and the Nasdaq Composite climbed 1.5%.\n- All three indexes are on pace to end the week higher, despite the selloff on Wednesday after Federal Reserve Chair Jerome Powell signaled that the central bank is unlikely to cut rates in March. The supercharged January jobs report supports that indication, some investors say.\n- While the leisure and hospitality industry added a mere 11,000 jobs in January, the critical service sector registered its 36th consecutive month of job gains. Post-pandemic, services businesses have benefited from Americans’ strong desires to spend money on experiences.\n- As that demand remains at a fever pitch, one new bar and restaurant in Minneapolis is seeing the effects.\n- Jillian Hiscock, about a month away from opening A Bar of Their Own, which exclusively will show women’s sporting events, has garnered overwhelming support from the Twin Cities community since Hiscock floated the idea last spring and ran a crowdfunding campaign to get it off the ground.\n- The same was true for the hiring efforts: Hiscock received 150 applications in two days’ time for 25 to 30 open positions.\n- “Since things have opened back up [following the pandemic], we’ve had a lot of folks whose relationships with work has fundamentally changed,” she said. “Showing up and just doing a thing for somebody that you feel doesn’t care about as a human is less interesting to people now, because we all know how quick that can be taken away.”\n- People want a better balance between their job and personal life, she said.\n- “People were really excited about this, not just seeing this as another job, but seeing this as an opportunity to be a part of something bigger,” she said.\n- President Joe Biden touted the Labor Department’s latest jobs report showing that hiring accelerated in the beginning of the year as unemployment remained historically low, saying it shows “America’s economy is the strongest in the world,” in a statement Friday.\n- The commander in chief noted the remarkable milestones the job market has achieved: The unemployment rate has been below 4% for 24 straight months and the US economy has created nearly 15 million jobs since January 2021.\n- “It’s great news for working families that wages, wealth, and jobs are higher now than before the pandemic, and I won’t stop fighting to lower costs and build an economy from the middle out and bottom up,” Biden said. “I’ll continue to stand in the way of efforts by Congressional Republicans to enact massive tax giveaways for the wealthy and big corporations; cut Medicare, Medicaid, and Social Security; and raise costs for American families.”\n- But a new CNN poll conducted by SSRS reflects that Biden still isn’t getting credit for economic gains on his watch. 55% of Americans say they feel Biden’s policies have worsened economic conditions.\n',
    },
    cleanedArticleText:
      '- The US economy added a remarkable 353,000 jobs in January, surpassing expectations and pushing the unemployment rate to a steady 3.7%.\n- The robust jobs report sent markets surging, with the S&P 500 closing at a record high.\n- Tech stocks, led by Meta Platforms and Amazon, were the major gainers, benefiting from strong earnings reports.\n- The strong job market is seen as a positive sign for the economy, creating a "virtuous cycle" of consumer spending and job creation.\n- However, concerns remain that the hot job market could prevent the Federal Reserve from cutting interest rates anytime soon.\n- Productivity growth in the fourth quarter surpassed expectations, potentially helping to reduce inflationary pressures.\n- Wage growth also showed a positive trend, indicating improved living standards for American households.\n- The service sector continues to drive job gains, with businesses benefiting from strong consumer demand for experiences.\n- Despite the positive jobs data, some investors worry that the decline in transportation stocks suggests potential economic challenges ahead.',
  };

  const [pieChartData, setPieChartData] = useState(initialPieChartData);
  const [doughnutChartData, setDoughnutChartData] = useState(
    initialDoughnutChartData
  );
  const [delayBarChartData, setDelayBarChartData] = useState(
    initialDelayBarChartData
  );

  const [implicitHateSpeechPercentage, setImplicitHateSpeechPercentage] =
    useState(0);

  useEffect(() => {
    if (articleData) {
      const analysis = x.analytics_metrics;
      const articleInfo = x.articleInfo;

      const ai_detector = analysis['AI detector'];
      const fact_or_opinion = analysis['fact_or_opinion'];
      const implicit_hate = analysis['implicit_hate'];
      const inappropriate_text_classifier =
        analysis['inappropriate_text_classifier'];
      const politicalBiasBERT = analysis['politicalBiasBERT'];
      const toxicity = analysis['toxicity'];

      const personOfInterest = articleInfo.PersonsOfInterest;
      const placesOfInterest = articleInfo.PlacesOfInterest;
      const author = articleInfo.author;
      const date = articleInfo.date;
      const summary = articleInfo.summary;

      polartestData[0] = politicalBiasBERT[0][2].score * 100;
      polartestData[1] = politicalBiasBERT[0][1].score * 100;
      polartestData[2] = politicalBiasBERT[0][0].score * 100;

      fact_or_op_default[0] = fact_or_opinion[0][0].score * 100;
      fact_or_op_default[1] = fact_or_opinion[0][1].score * 100;

      setImplicitHateSpeechPercentage(implicit_hate[0][0]['score'] * 100);

      const nsfw = inappropriate_text_classifier[0][0].score * 100;
      const sfw = inappropriate_text_classifier[0][0].score * 100;
      datatestpi[0] = nsfw;
      datatestpi[1] = sfw;

      const ai_generated = ai_detector[0][1].score * 100;
      const human_generated = ai_detector[0][0].score * 100;
      datatestpi_[0] = ai_generated;
      datatestpi_[1] = human_generated;

      const toxic = toxicity[0][0].score * 100;
      const masculine = toxicity[0][1].score * 100;
      const feminine = toxicity[0][2].score * 100;
      const insult = toxicity[0][3].score * 100;
      const mental_illness = toxicity[0][4].score * 100;
      const obscene = toxicity[0][5].score * 100;
      const sexually_explicit = toxicity[0][6].score * 100;
      const severely_toxic = toxicity[0][7].score * 100;

      datatest[0] = toxic;
      datatest[1] = masculine;
      datatest[2] = feminine;
      datatest[3] = insult;
      datatest[4] = mental_illness;
      datatest[5] = obscene;
      datatest[6] = sexually_explicit;
      datatest[7] = severely_toxic;
    }
  }, []);

  return (
    <div>
      {/* DoughnutPie and DelayBarChart side by side */}
      <div className='chart-container'>
        <div className='chart-item'>
          {/* left, right and neutral */}
          <PolarChart data={initialPolarChartData} options={optionsPolar} />
        </div>
        <div className='chart-item'>
          {/* fact or opinion */}
          <DoughnutPie
            data={doughnutChartData}
            options={optionsDoughNut}
            chartType='doughnut'
          />
        </div>
      </div>

      {/* Implicit Hate Speech Progress Bar */}
      <div className='my-20'>
        <div className='progress-bar-container'>
          {/* how hateful is it */}
          <h2 className='font-semibold text-md'>
            Implicit Hate Speech Analysis
          </h2>
          <ProgressBar percentage={implicitHateSpeechPercentage} />
        </div>
      </div>

      {/* PieChart and PolarChart side by side */}
      <div className='chart-container'>
        <div className='chart-item'>
          {/* nsfw or sfw */}
          <PieChart data={pieChartData} options={optionsPie} />
        </div>
        <div className='chart-item'>
          {/* ai or human generated */}
          <PieChart data={initialPieChartDataAI} options={optionsPieAI} />
        </div>
      </div>

      <div className='my-20'>
        {/* toxicity  */}
        <DelayBarChart data={delayBarChartData} />
      </div>
    </div>
  );
}

export default ChartSection;
