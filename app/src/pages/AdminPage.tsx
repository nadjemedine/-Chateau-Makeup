import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Package, DollarSign, Clock, CheckCircle, XCircle, Truck, BarChart3, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { products } from '@/lib/data'

type Order = { id: string; full_name: string; phone: string; address: string; city: string; total: number; status: string; items: any[]; created_at: string }

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, totalProducts: products.length })
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => { loadOrders() }, [])

  const loadOrders = async () => {
    const { data: dbOrders, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (!error && dbOrders) { setOrders(dbOrders); calculateStats(dbOrders) }
    else { const localOrders = JSON.parse(localStorage.getItem('chateau-orders') || '[]'); setOrders(localOrders); calculateStats(localOrders) }
  }

  const calculateStats = (orders: Order[]) => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
    setStats({ totalOrders: orders.length, totalRevenue, pendingOrders: orders.filter((o) => o.status === 'pending').length, totalProducts: products.length })
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
    if (!error) loadOrders()
    else {
      const localOrders = JSON.parse(localStorage.getItem('chateau-orders') || '[]')
      const order = localOrders.find((o: Order) => o.id === orderId)
      if (order) order.status = newStatus
      localStorage.setItem('chateau-orders', JSON.stringify(localOrders))
      loadOrders()
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) { case 'pending': return <Clock size={14} className="text-amber-500" />; case 'confirmed': return <CheckCircle size={14} className="text-blue-500" />; case 'shipped': return <Truck size={14} className="text-indigo-500" />; case 'delivered': return <CheckCircle size={14} className="text-emerald-500" />; case 'cancelled': return <XCircle size={14} className="text-red-500" />; default: return <Clock size={14} /> }
  }
  const getStatusLabel = (status: string) => { switch (status) { case 'pending': return 'En attente'; case 'confirmed': return 'Confirmee'; case 'shipped': return 'En cours'; case 'delivered': return 'Livree'; case 'cancelled': return 'Annulee'; default: return status } }
  const getStatusColor = (status: string) => { switch (status) { case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200'; case 'confirmed': return 'bg-blue-50 text-blue-700 border-blue-200'; case 'shipped': return 'bg-indigo-50 text-indigo-700 border-indigo-200'; case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200'; case 'cancelled': return 'bg-red-50 text-red-700 border-red-200'; default: return 'bg-stone-50 text-stone-700' } }

  const tabs = [
    { id: 'overview', label: 'Tableau de bord', icon: BarChart3 },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart },
    { id: 'products', label: 'Produits', icon: Package },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3"><Link to="/" className="text-lg font-bold tracking-[0.2em] uppercase">Chateau</Link><span className="text-xs bg-stone-900 text-white px-2 py-0.5 rounded">Admin</span></div>
          <Link to="/" className="text-xs text-stone-500 hover:text-stone-900">Voir le site</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-1 mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-stone-900 text-white' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`}>
              <tab.icon size={14} />{tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[{label:'Commandes',val:stats.totalOrders,icon:ShoppingCart},{label:'Revenus (DZD)',val:stats.totalRevenue.toFixed(2),icon:DollarSign,accent:stats.totalRevenue>0},{label:'En attente',val:stats.pendingOrders,icon:Clock,accent:true},{label:'Produits',val:stats.totalProducts,icon:Package}].map((s,i) => (
                <div key={i} className="bg-white rounded-lg p-4 border border-stone-100">
                  <div className="flex items-center justify-between mb-2"><span className="text-xs text-stone-500">{s.label}</span><s.icon size={16} className={s.accent ? 'text-amber-500' : 'text-stone-400'} /></div>
                  <p className={`text-2xl font-bold ${s.accent ? 'text-amber-600' : ''}`}>{s.val}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg border border-stone-100">
              <div className="p-4 border-b border-stone-100 flex items-center justify-between"><h2 className="text-sm font-semibold">Commandes recentes</h2><button onClick={() => setActiveTab('orders')} className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1">Voir tout<ChevronRight size={12} /></button></div>
              {orders.length > 0 ? <div className="divide-y divide-stone-50">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="p-4 flex items-center justify-between hover:bg-stone-50">
                    <div className="flex items-center gap-3">{getStatusIcon(order.status)}<div><p className="text-xs font-medium">{order.full_name}</p><p className="text-[10px] text-stone-400">{order.phone} | {order.city}</p></div></div>
                    <div className="text-right"><p className="text-xs font-semibold">{order.total?.toFixed(2)} DZD</p><span className={`text-[10px] px-1.5 py-0.5 rounded border ${getStatusColor(order.status)}`}>{getStatusLabel(order.status)}</span></div>
                  </div>
                ))}
              </div> : <div className="p-8 text-center text-sm text-stone-400">Aucune commande pour le moment</div>}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg border border-stone-100">
            <div className="p-4 border-b border-stone-100"><h2 className="text-sm font-semibold">Toutes les commandes</h2></div>
            {orders.length > 0 ? <div className="divide-y divide-stone-50">
              {orders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-stone-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2"><span className="text-xs font-mono font-medium">#{order.id.slice(-8)}</span><span className={`text-[10px] px-1.5 py-0.5 rounded border ${getStatusColor(order.status)}`}>{getStatusLabel(order.status)}</span></div>
                      <p className="text-xs text-stone-600 mt-1">{order.full_name} | {order.phone}</p>
                      <p className="text-[10px] text-stone-400">{order.address}, {order.city}</p>
                    </div>
                    <div className="text-right"><p className="text-sm font-bold">{order.total?.toFixed(2)} DZD</p><p className="text-[10px] text-stone-400">{new Date(order.created_at).toLocaleDateString('fr-FR')}</p></div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">{order.items?.map((item: any, i: number) => <span key={i} className="text-[10px] bg-stone-100 px-2 py-0.5 rounded">{item.name} x{item.quantity}</span>)}</div>
                  <div className="flex gap-1 mt-3">
                    {order.status === 'pending' && <button onClick={() => updateOrderStatus(order.id, 'confirmed')} className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100">Confirmer</button>}
                    {order.status === 'confirmed' && <button onClick={() => updateOrderStatus(order.id, 'shipped')} className="text-[10px] px-2 py-1 bg-indigo-50 text-indigo-700 rounded border border-indigo-200 hover:bg-indigo-100">Expedier</button>}
                    {order.status === 'shipped' && <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 hover:bg-emerald-100">Livrer</button>}
                    {(order.status === 'pending' || order.status === 'confirmed') && <button onClick={() => updateOrderStatus(order.id, 'cancelled')} className="text-[10px] px-2 py-1 bg-red-50 text-red-700 rounded border border-red-200 hover:bg-red-100">Annuler</button>}
                  </div>
                </div>
              ))}
            </div> : <div className="p-8 text-center text-sm text-stone-400">Aucune commande</div>}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-lg border border-stone-100">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between"><h2 className="text-sm font-semibold">Tous les produits</h2><span className="text-xs text-stone-400">{products.length} produits</span></div>
            <div className="divide-y divide-stone-50">
              {products.map((product) => (
                <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-stone-50">
                  <div className="w-12 h-12 bg-stone-50 rounded overflow-hidden shrink-0"><img src={product.image} alt="" className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate">{product.name}</p><p className="text-[10px] text-stone-400">{product.brand} | {product.category}</p></div>
                  <div className="text-right shrink-0"><p className="text-xs font-semibold">{product.price.toFixed(2)} DZD</p>{product.badge && <span className="text-[10px] bg-stone-900 text-white px-1.5 py-0.5 rounded">{product.badge}</span>}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
