import Navbar from '@/components/navbar';
import ArticleTable from '@/components/AnalysisTable';
import AnalysisCharts from '@/components/AnalysisCharts';

function Analysis() {
  return (
    <div>
      <Navbar />
      <div className='w-full mt-5'>
        <div className='max-w-[1175px] mx-auto text-sm'>
          <div className='my-5'>
            <ArticleTable />
          </div>
          <AnalysisCharts />
        </div>
      </div>
    </div>
  );
}

export default Analysis;
