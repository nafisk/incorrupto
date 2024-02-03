import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const articles = [
  {
    title: 'Breaking News: New Discoveries in Science',
    paperName: 'Daily Insights',
    author: 'Jane Doe',
    datePosted: 'Feb 24, 2024',
  },
  {
    title: 'Global Economy on the Rise',
    paperName: 'World Today',
    author: 'John Smith',
    datePosted: 'Mar 1, 2024',
  },
];

export default function DataTable() {
  return (
    <Table>
      <TableCaption>A list of your recent reports</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Paper Name</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Date Posted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map(article => (
          <TableRow key={article.datePosted}>
            <TableCell>{article.title}</TableCell>
            <TableCell>{article.paperName}</TableCell>
            <TableCell>{article.author}</TableCell>
            <TableCell>{article.datePosted}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
