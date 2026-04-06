import { Download } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

const payments = [
  { id: 'P001', student: 'ចាន់ ដារ៉ា', grade: '10A', fee: 'Annual Fee', amount: 50, paid: 50, date: '2026-01-10', status: 'Paid' },
  { id: 'P002', student: 'ស្រី ណារ', grade: '10A', fee: 'Annual Fee', amount: 50, paid: 25, date: '2026-01-15', status: 'Partial' },
  { id: 'P003', student: 'ហេង វ៉ា', grade: '9B', fee: 'Annual Fee', amount: 50, paid: 0, date: '—', status: 'Unpaid' },
  { id: 'P004', student: 'ម៉ែន ស្រីណា', grade: '11C', fee: 'Annual Fee', amount: 50, paid: 50, date: '2026-02-01', status: 'Paid' },
  { id: 'P005', student: 'វង្ស ពិសិដ្ឋ', grade: '12A', fee: 'Annual Fee', amount: 50, paid: 50, date: '2026-01-08', status: 'Paid' },
  { id: 'P006', student: 'ឡុង ស្រីពេជ្រ', grade: '7B', fee: 'Annual Fee', amount: 30, paid: 0, date: '—', status: 'Unpaid' },
  { id: 'P007', student: 'ទេព ចន្ទបូ', grade: '8A', fee: 'Exam Fee', amount: 10, paid: 10, date: '2026-03-01', status: 'Paid' },
];

export function FinanceView() {
  const totalCollected = payments.reduce((sum, p) => sum + p.paid, 0);
  const totalPending = payments.reduce((sum, p) => sum + (p.amount - p.paid), 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Total Collected / ប្រាក់បានទទួល" value={`$${totalCollected}`} icon={DollarSign} color="green" />
        <StatCard title="Paid / បានបង់" value={payments.filter(p => p.status === 'Paid').length} subtitle="students" icon={CheckCircle} color="green" />
        <StatCard title="Pending / មិនទាន់" value={payments.filter(p => p.status !== 'Paid').length} subtitle="students" icon={Clock} color="yellow" />
        <StatCard title="Outstanding / ជំពាក់" value={`$${totalPending}`} icon={XCircle} color="red" />
      </div>

      {/* Payment table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Fee Tracking / តាមដានថ្លៃសិក្សា</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download size={14} />
              Export Report
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-600">ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Student / សិស្ស</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Class</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Fee Type</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Paid</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Balance</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-blue-50">
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{p.id}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-800">{p.student}</td>
                  <td className="px-4 py-2.5"><Badge variant="info">{p.grade}</Badge></td>
                  <td className="px-4 py-2.5 text-gray-600">{p.fee}</td>
                  <td className="px-4 py-2.5 text-right font-medium">${p.amount}</td>
                  <td className="px-4 py-2.5 text-right text-green-700 font-medium">${p.paid}</td>
                  <td className="px-4 py-2.5 text-right text-red-600 font-medium">${p.amount - p.paid}</td>
                  <td className="px-4 py-2.5 text-gray-500 text-xs">{p.date}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={p.status === 'Paid' ? 'success' : p.status === 'Partial' ? 'warning' : 'danger'}>
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-gray-200">
              <tr className="bg-gray-50">
                <td colSpan={4} className="px-4 py-3 font-semibold text-gray-700">Total / សរុប</td>
                <td className="px-4 py-3 text-right font-bold">${payments.reduce((s, p) => s + p.amount, 0)}</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">${totalCollected}</td>
                <td className="px-4 py-3 text-right font-bold text-red-600">${totalPending}</td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Quick summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card title="Fee Collection Rate / អត្រាប្រមូល">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Annual Fee</span>
              <span className="font-medium">78%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Exam Fee</span>
              <span className="font-medium">92%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </Card>
        <Card title="Payment Methods / វិធីបង់ប្រាក់">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Cash / សាច់ប្រាក់</span>
              <span className="font-medium">$185</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Bank Transfer</span>
              <span className="font-medium">$60</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">ABA / Wing</span>
              <span className="font-medium">$0</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
